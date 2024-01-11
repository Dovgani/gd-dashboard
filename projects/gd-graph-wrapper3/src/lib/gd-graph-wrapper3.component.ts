import { Component         } from '@angular/core';
import { ElementRef        } from '@angular/core';
import { AfterViewInit     } from '@angular/core';
import { ViewChild         } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OnDestroy         } from '@angular/core';
import { ITooltipResult    } from 'gd-common';
import { GDCommonTools     } from 'gd-common';
import { GDGraphicComponent} from 'gd-graphic';
import { IGraphicSettings  } from 'gd-graphic';

@Component({
    selector:      'gd-graph-wrapper3',
    templateUrl: "./gd-graph-wrapper3.component.html",
    styleUrls:  ["./gd-graph-wrapper3.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GDGraphWrapper3Component implements AfterViewInit, OnDestroy
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

    private parentID : string = '';
    private tooltipModel : any;

    public      name               : string = 'Diagram'; 
    public  get HTMLElement()      : any       { return this.el.nativeElement;    }

    private     stopTooltip        : boolean = false;
    public  get StopTooltip()      : boolean   { return this.stopTooltip;         }
    public  set StopTooltip( value : boolean ) {        this.stopTooltip = value; }

    public  get TooltipDelay()     : number    { return 1000;                     }

    get ParentID()      : any   {  return this.parentID;          }  
    set ParentID( value : any ) {         this.parentID = value;  }    

    public settings : IGraphicSettings | null = null;

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

    private randomScalingFactor() {  return Math.round( (Math.random() * 100) );  };
    
    public  ngAfterViewInit() : void 
    {
        this.settings = 
        {
            type : "bar",
            data : 
            { 
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets  : 
                [
                    {
                        label               : 'My First',
                        backgroundColor     : ["rgba(255, 99, 132, 0.5)",  "rgba(255, 159, 64, 0.5)",  "rgba(255, 205, 86, 0.5)",  "rgba(75, 192, 192, 0.5)",  "rgba(54, 162, 235, 0.5)",  "rgba(153, 102, 255, 0.5)",  "rgba(201, 203, 207, 0.5)",  "rgba(255, 99, 132, 0.5)",  "rgba(255, 159, 64, 0.5)",  "rgba(255, 205, 86, 0.5)",  "rgba(75, 192, 192, 0.5)",  "rgba(54, 162, 235, 0.5)" ],
                        borderColor         : ["rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",       "rgb (153, 102, 255)",       "rgb (201, 203, 207)",       "rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",     ],
                        hoverBackgroundColor: ["rgba(255, 99, 132, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 205, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(54, 162, 235, 0.75)", "rgba(153, 102, 255, 0.75)", "rgba(201, 203, 207, 0.75)", "rgba(255, 99, 132, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 205, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(54, 162, 235, 0.75)"],
                        hoverBorderColor    : ["rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",       "rgb (153, 102, 255)",       "rgb (201, 203, 207)",       "rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",     ],
                        borderWidth         : 1,
                        fill                : false, 
                        data                : 
                        [
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
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
                legend: { display : true,  labels : { fontColor: '#aaa' } },            
                title:  { display : false, text   : 'Line Chart'          },
                scales: 
                {
                    xAxes: [ { ticks: { fontColor: "#aaa" }, display: true, gridLines: { color: '#777', zeroLineColor :'#fff' }                 } ],
                    yAxes: [ { ticks: { fontColor: "#aaa" }, display: true, gridLines: { color: '#777', zeroLineColor :'#fff' }, type: 'linear' } ]
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
        // console.log(event);
    }

    public onGraphicHover( event : any ) : void
    {
       // console.log(event);
    }

    private getConfig() : IGraphicSettings 
    {
        var config : IGraphicSettings = 
        {
            type : "bar",
            data : 
            { 
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets  : 
                [
                    {
                        label               : 'My First',
                        backgroundColor     : ["rgba(255, 99, 132, 0.5)",  "rgba(255, 159, 64, 0.5)",  "rgba(255, 205, 86, 0.5)",  "rgba(75, 192, 192, 0.5)",  "rgba(54, 162, 235, 0.5)",  "rgba(153, 102, 255, 0.5)",  "rgba(201, 203, 207, 0.5)",  "rgba(255, 99, 132, 0.5)",  "rgba(255, 159, 64, 0.5)",  "rgba(255, 205, 86, 0.5)",  "rgba(75, 192, 192, 0.5)",  "rgba(54, 162, 235, 0.5)" ],
                        borderColor         : ["rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",       "rgb (153, 102, 255)",       "rgb (201, 203, 207)",       "rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",     ],
                        hoverBackgroundColor: ["rgba(255, 99, 132, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 205, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(54, 162, 235, 0.75)", "rgba(153, 102, 255, 0.75)", "rgba(201, 203, 207, 0.75)", "rgba(255, 99, 132, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 205, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(54, 162, 235, 0.75)"],
                        hoverBorderColor    : ["rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",       "rgb (153, 102, 255)",       "rgb (201, 203, 207)",       "rgb (255, 99, 132)",       "rgb (255, 159, 64)",       "rgb (255, 205, 86)",       "rgb (75, 192, 192)",       "rgb (54, 162, 235)",     ],
                        borderWidth         : 1,
                        fill                : false, 
                        data                : 
                        [
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
                            this.randomScalingFactor(),
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
                    xAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: true, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }                 } ],
                    yAxes: [ { ticks: { fontColor: this.axeLabelsColor }, display: true, gridLines: { color: this.gridLines, zeroLineColor : this.gridLinesZero }, type: 'linear' } ]
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
