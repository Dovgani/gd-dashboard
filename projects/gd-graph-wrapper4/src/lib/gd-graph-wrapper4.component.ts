import { Component         } from '@angular/core';
import { AfterViewInit     } from '@angular/core';
import { ElementRef        } from '@angular/core';
import { ViewChild         } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OnDestroy         } from '@angular/core';
import { ITooltipResult    } from 'gd-common';
import { GDCommonTools     } from 'gd-common';
import { GDGraphicComponent} from 'gd-graphic';
import { IGraphicSettings  } from 'gd-graphic';

declare var moment : any;

@Component({
    selector:      'gd-graph-wrapper4',
    templateUrl: "./gd-graph-wrapper4.component.html",
    styleUrls:  ["./gd-graph-wrapper4.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GDGraphWrapper4Component implements AfterViewInit, OnDestroy
{
    public   GetTooltip( x : number, y : number ) : ITooltipResult | null       
    { 
        if( ! this.tooltipModel      ) return null;
        if( ! this.tooltipModel.body ) return null;

        let hAlign      = 'center';
        let itemPadding = '0';
        let tooltip     = `<div style="margin: 2px 0 0 0;">`;

        for( var i = 0; i < this.tooltipModel.body.length; ++i )
        {
            for( var j = 0; j < this.tooltipModel.body[i].lines.length; ++j )
            {
                tooltip += `${this.tooltipModel.body[i].lines[j]}`;
            }
        }

        tooltip += `</div>`;

        var txtSize = GDCommonTools.MeasureText( tooltip, 'monospace', 'normal', '12px' );

        return { size : { w : txtSize.w + 10, h : txtSize.h + 6 }, content : tooltip, hAlign: hAlign, contentPadding: '1px 0 0 3px', padding: itemPadding, isHTML: false };
    }

    @ViewChild('graphic') graphic = {} as GDGraphicComponent;

    public       name               : string = 'Line'; 
    public   get HTMLElement()      : any       { return this.el.nativeElement;    }
    private  tooltipModel : any;

    private     stopTooltip        : boolean = false;
    public  get StopTooltip()      : boolean   { return this.stopTooltip;         }
    public  set StopTooltip( value : boolean ) {        this.stopTooltip = value; }

    public  get TooltipDelay()     : number    { return 1000;                     }

    private     parentID : string = '';
    public  get ParentID()      : any   {  return this.parentID;          }  
    public  set ParentID( value : any ) {         this.parentID = value;  }    

    public settings  : IGraphicSettings | null = null;

    //#region Subscriptions
    //#endregion

    private legendColor    = '#aaa';
    private axeLabelsColor = '#aaa';
    private gridLines      = '#888';
    private gridLinesZero  = '#fff';

    constructor( private el : ElementRef )
    {
    }

    public SetTheme( theme: string )
    {
        if( theme === 'light' )
        {
            this.legendColor    = '#aaa';
            this.axeLabelsColor = '#aaa';
            this.gridLines      = '#bbb';
            this.gridLinesZero  = '#777';
        }

        if( theme === 'dark' )
        {
            this.legendColor    = '#aaa';
            this.axeLabelsColor = '#aaa';
            this.gridLines      = '#888';
            this.gridLinesZero  = '#ccc';
        }

        this.graphic.Refresh( this.getConfig() );
    }

    private unitLessThanDay(unit : string ) {  return unit === 'second' || unit === 'minute' || unit === 'hour'; }
    private beforeNineThirty(date : any ) { return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30); }

    // Returns true if outside 9:30am-4pm on a weekday
    private outsideMarketHours(date : any, unit : string ) 
    {
        if( date.isoWeekday() > 5 )                                                          return true;
        if( this.unitLessThanDay(unit) && (this.beforeNineThirty(date) || date.hour() > 16)) return true;
                                                                                             return false;
    }

    private randomNumber(min : any, max : any) {  return Math.random() * (max - min) + min;  }

    private randomBar(date : any, lastClose : any) 
    {
        var open  = this.randomNumber( lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = this.randomNumber( open * 0.95, open * 1.05).toFixed(2);

        return {
            t: date.valueOf(),
            y: close
        };
    }

    private generateData() 
    {
        var unit = 'day';

        var date = moment('Jan 01 2020', 'MMM DD YYYY');
        var now  = moment();
        var data = [];
        var lessThanDay = this.unitLessThanDay(unit);

        for( ; data.length < 1200 && date.isBefore(now); )
        {
            date = date.clone().add(1, unit).startOf(unit);

            if( this.outsideMarketHours(date, unit) ) 
            {
                if( ! lessThanDay || ! this.beforeNineThirty(date) ) 
                {
                    date = date.clone().add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, 'day');
                }

                if (lessThanDay ) 
                {
                    date = date.hour(9).minute(30).second(0);
                }
            }

            var a = this.randomBar( date, data.length > 0 ? data[data.length - 1].y : 30 );
            data.push( a );
        }

        return data;
    }

    public  ngAfterViewInit() : void 
    {
        this.settings = 
        {
            data: 
            {
                datasets: [{
                    type: 'line',
                    label: 'Corporation',
                    backgroundColor: ['red'],
                    borderColor: ['red'],
                    data: this.generateData() as any,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }]
            },
            options: 
            {
                legend: {
                    display: true,
                    labels: {
                        fontColor: '#fff'
                    }
                },
                animation: 
                {
                    duration: 0
                },
                scales:
                {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        offset: true,
                        ticks: {
                            fontColor: "white",
                            display: true,
                            major: {
                                enabled: true,
                                fontStyle: 'bold'
                            },
                            source: 'data',
                            autoSkip: true,
                            autoSkipPadding: 75,
                            maxRotation: 0,
                            sampleSize: 100
                        },
                        gridLines: { color: '#777', zeroLineColor :'#fff'},
    
                        afterBuildTicks: function(scale: any, ticks: any) 
                        {
                            if( ticks === undefined ) return;
    
                            var majorUnit = scale._majorUnit;
                            var firstTick = ticks[0];
                            var i, ilen, val, tick, currMajor, lastMajor;
    
                            val = moment(ticks[0].value);
                            if( (majorUnit === 'minute' && val.second() === 0)
                             || (majorUnit === 'hour'   && val.minute() === 0)
                             || (majorUnit === 'day'    && val.hour()   === 9)
                             || (majorUnit === 'month'  && val.date()    <= 3 && val.isoWeekday() === 1)
                             || (majorUnit === 'year'   && val.month()  === 0) ) 
                            {
                                firstTick.major = true;
                            } 
                            else 
                            {
                                firstTick.major = false;
                            }
    
                            lastMajor = val.get(majorUnit);
    
                            for( i = 1, ilen = ticks.length; i < ilen; i++ )
                            {
                                tick = ticks[i];
                                val = moment(tick.value);
                                currMajor  = val.get(majorUnit);
                                tick.major = currMajor !== lastMajor;
                                lastMajor  = currMajor;
                            }
                            return ticks;
                        }
                    }],
                    yAxes: [{
                        ticks: { fontColor: "#aaa" },
                        display: true,
                        gridLines: { color: '#777', zeroLineColor :'#fff', drawBorder: true},
                        scaleLabel: 
                        {
                            ticks: { fontColor: "#aaa" },
                            display: true,
                            fontColor: '#fff',
                            labelString: 'Closing price ($)'
                        }
                    }]
                },
                tooltips: 
                {
                    enabled   : false,
                    intersect : false,
                    mode      : 'index',
                    custom: (tooltipModel : any) =>
                    {
                        this.tooltipModel = tooltipModel;
                    }, 
                    callbacks: 
                    {
                        label: function(tooltipItem : any, myData : any)
                        {
                            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };
    
        this.graphic.Create( this.getConfig() );
    }

    public  ngOnDestroy()
    {
    }    

    public  BeforeTooltip() : void
    { 
        this.StopTooltip = false;
    }    

    public  AfterTooltip() : void
    { 
        this.StopTooltip = false;
    }  

    public  onGraphicClick( event : any ) : void
    {
        // console.log(e);
    }

    public  onGraphicHover( event : any ) : void
    {
       // console.log(event);
    }

    private getConfig() : IGraphicSettings 
    {
        var config : IGraphicSettings  = 
        {
            data: 
            {
                datasets: [{
                    type: 'line',
                    label: 'Corporation',
                    backgroundColor: ['red'],
                    borderColor: ['red'],
                    data: this.generateData() as any,
                    pointRadius: 0,
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2
                }]
            },
            options: 
            {
                legend: { display: true, labels: { fontColor: this.legendColor } },
                animation: { duration: 0 },
                scales:
                {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
                        offset: true,
                        ticks: {
                            fontColor: this.axeLabelsColor,
                            display: true,
                            major: {
                                enabled: true,
                                fontStyle: 'bold'
                            },
                            source: 'data',
                            autoSkip: true,
                            autoSkipPadding: 75,
                            maxRotation: 0,
                            sampleSize: 100
                        },
                        gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero },
    
                        afterBuildTicks: (scale : any, ticks : any) =>
                        {
                            if( ! ticks ) return;
    
                            var majorUnit = scale._majorUnit;
                            var firstTick = ticks[0];
                            var i, ilen, val, tick, currMajor, lastMajor;
    
                            val = moment(ticks[0].value);
                            if( (majorUnit === 'minute' && val.second() === 0)
                             || (majorUnit === 'hour'   && val.minute() === 0)
                             || (majorUnit === 'day'    && val.hour()   === 9)
                             || (majorUnit === 'month'  && val.date()    <= 3 && val.isoWeekday() === 1)
                             || (majorUnit === 'year'   && val.month()  === 0) ) 
                            {
                                firstTick.major = true;
                            } 
                            else 
                            {
                                firstTick.major = false;
                            }
    
                            lastMajor = val.get(majorUnit);
    
                            for( i = 1, ilen = ticks.length; i < ilen; i++ )
                            {
                                tick = ticks[i];
                                val = moment(tick.value);
                                currMajor  = val.get(majorUnit);
                                tick.major = currMajor !== lastMajor;
                                lastMajor  = currMajor;
                            }
                            return ticks;
                        }
                    }],
                    yAxes: [{
                        ticks: { fontColor: this.axeLabelsColor },
                        display: true,
                        gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero, drawBorder: true},
                        scaleLabel: 
                        {
                            ticks: { fontColor: "#0a0" },
                            display: true,
                            fontColor: this.gridLines,
                            labelString: 'Closing price ($)'
                        }
                    }]
                },
                tooltips: 
                {
                    enabled   : false,
                    intersect : false,
                    mode      : 'index',
                    custom: (tooltipModel : any) =>
                    {
                        this.tooltipModel = tooltipModel;
                    }, 
                    callbacks: 
                    {
                        label: function(tooltipItem : any, myData : any)
                        {
                            var label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                }
            }
        };

        return config;
    }
}
