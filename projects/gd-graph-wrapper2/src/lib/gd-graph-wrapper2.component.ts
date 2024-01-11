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

@Component({
    selector:      'gd-graph-wrapper2',
    templateUrl: "./gd-graph-wrapper2.component.html",
    styleUrls:  ["./gd-graph-wrapper2.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GDGraphWrapper2Component implements AfterViewInit, OnDestroy
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

    private tooltipModel : any;

    public      name               : string = 'Pie'; 
    public  get HTMLElement()      : any       { return this.el.nativeElement;    }

    private     stopTooltip        : boolean = false;
    public  get StopTooltip()      : boolean   { return this.stopTooltip;         }
    public  set StopTooltip( value : boolean ) {        this.stopTooltip = value; }

    public  get TooltipDelay()     : number    { return 1000;                     }

    private     parentID           : string = '';
    public  get ParentID()         : any       {  return this.parentID;           }  
    public  set ParentID(    value : any )     {         this.parentID = value;   }    

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
            this.axeLabelsColor = '#888';
            this.gridLines      = '#bbb';
            this.gridLinesZero  = '#444';
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

    private randomScalingFactor() {  return Math.round( (Math.random() * 100) );  };
    
    public  ngAfterViewInit() : void 
    {
        this.settings = 
        {
            type : "pie",
            data : 
            { 
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets  : 
                [
                    {
                        label           : 'My First',
                        backgroundColor : [	'red', 'orange', 'yellow', 'green', 'blue' ],
                        borderColor     : [	'lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray' ],
                        fill            : false, 
                        data            : 
                        [
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor()
                        ] 
                    }
                ]
            },
            options : 
            { 
                responsive: true,
                legend: { display : true,  labels : { fontColor: this.legendColor } },            
                title:  { display : false, text   : 'Line Chart'                    },
                scales: 
                {
                    xAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: false, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }                 } ],
                    yAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: false, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }, type: 'linear' } ]
                },
                tooltips :
                {
                    enabled: false,

                    custom: (tooltipModel : any) =>
                    {
                        this.tooltipModel = tooltipModel;
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

    public onGraphicClick( event : any ) : void
    {
        // console.log(e);
    }

    public onGraphicHover( event : any ) : void
    {
       // console.log(event);
    }

    private getConfig() : IGraphicSettings 
    {
        var config : IGraphicSettings = 
        {
            type : "pie",
            data : 
            { 
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets  : 
                [
                    {
                        label           : 'My First',
                        backgroundColor : [	'red', 'orange', 'yellow', 'green', 'blue' ],
                        borderColor     : [	'lightgray', 'lightgray', 'lightgray', 'lightgray', 'lightgray' ],
                        fill            : false, 
                        data            : 
                        [
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor()
                        ] 
                    }
                ]
            },
            options : 
            { 
                responsive: true,
                legend: { display : true,  labels : { fontColor: this.legendColor } },            
                title:  { display : false, text   : 'Line Chart'                    },
                scales: 
                {
                    xAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: false, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }                 } ],
                    yAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: false, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }, type: 'linear' } ]
                },
                tooltips :
                {
                    enabled: false,

                    custom: (tooltipModel : any) =>
                    {
                        this.tooltipModel = tooltipModel;
                    }                
                }
            }
        };

        return config;
    }
}
