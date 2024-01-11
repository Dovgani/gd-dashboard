import { Component                } from '@angular/core';
import { ViewChild                } from '@angular/core';
import { ChangeDetectorRef        } from '@angular/core';
import { LocationStrategy         } from '@angular/common';
import { GDWindowComponent        } from 'gd-window';
import { IGDWindowConfig          } from 'gd-window';
import { GDCommonService          } from 'gd-common';
import { GDThemeService           } from 'gd-theme';
import { GDDashboardComponent     } from 'gd-dashboard';

import { GDGraphWrapper1Component } from 'projects/gd-graph-wrapper1/src/lib/gd-graph-wrapper1.component';
import { GDGraphWrapper2Component } from 'projects/gd-graph-wrapper2/src/lib/gd-graph-wrapper2.component';
import { GDGraphWrapper3Component } from 'projects/gd-graph-wrapper3/src/lib/gd-graph-wrapper3.component';
import { GDGraphWrapper4Component } from 'projects/gd-graph-wrapper4/src/lib/gd-graph-wrapper4.component';

import { Subject                  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent 
{
    public  actionSubject = new Subject<any>();
    public  showDashboard = false;

    @ViewChild('aboutWindow')     aboutWindow     : GDWindowComponent    | null = null;
    @ViewChild('dashboardWindow') dashboardWindow : GDWindowComponent    | null = null;
    @ViewChild('dashboard')       dashboard       : GDDashboardComponent | null = null;

    @ViewChild('dashboardChild1') dashboardChild1 = {} as GDWindowComponent;
    @ViewChild('dashboardChild2') dashboardChild2 = {} as GDWindowComponent;
    @ViewChild('dashboardChild3') dashboardChild3 = {} as GDWindowComponent;
    @ViewChild('dashboardChild4') dashboardChild4 = {} as GDWindowComponent;
    @ViewChild('dashboardChild5') dashboardChild5 = {} as GDWindowComponent;
    @ViewChild('dashboardChild6') dashboardChild6 = {} as GDWindowComponent;

    @ViewChild('graphic1')        graphic1        = {} as GDGraphWrapper1Component;
    @ViewChild('graphic2')        graphic2        = {} as GDGraphWrapper2Component;
    @ViewChild('graphic3')        graphic3        = {} as GDGraphWrapper3Component;
    @ViewChild('graphic4')        graphic4        = {} as GDGraphWrapper4Component;
    @ViewChild('graphic5')        graphic5        = {} as GDGraphWrapper1Component;
    @ViewChild('graphic6')        graphic6        = {} as GDGraphWrapper1Component;

    public dashboardWindowConfig : IGDWindowConfig = 
    {
        className               : 'gd-dashboard',
        isOpened                : false,
        isModal                 : false,
        isFooterVisible         : false,
        isContentBorderVisible  : false,
        width                   : 1200,
        height                  : 750,
        title                   : 'Dashboard',
        isIconImage             : true,
        icon                    : './assets/Window.png',
        whenHeaderClick         : (data:any) => { this.commonService.OpenedWindowsManager( data?.window, '' );      },
        whenCloseClick          : (data:any) => { this.commonService.OpenedWindowsManager( data?.window, 'close' ); }
    };  

    public aboutWindowConfig : IGDWindowConfig = 
    {
        className               : 'gd-about',
        isOpened                : false,
        isModal                 : false,
        isFooterVisible         : false,
        isScrollBarsVisible     : true,
        isIconImage             : false,
        width                   : 700,
        height                  : 499,
        title                   : 'About This Demo',
        icon                    : 'bi-info-circle',
        footer                  : '',
        ok                      : 'OK',
        cancel                  : 'Cancel',
        whenHeaderClick         : (data:any) => { this.commonService.OpenedWindowsManager( data?.window, '' );      },
        whenCloseClick          : (data:any) => { this.commonService.OpenedWindowsManager( data?.window, 'close' ); },
        whenOverlayClick        : () =>         { alert( 'Modal has been closed' );                                 }
    };  

    public dashboardWindow1Config : IGDWindowConfig = 
    {
        className              : 'gd-chart1',
        isOpened               : true,
        isModal                : false,
        isResizable            : false,
        width                  : 566,
        height                 : 290,
        isScrollBarsVisible    : false,
        isMinimizeVisible      : true,
        isFooterVisible        : false,
        isHeaderVisible        : false,
        isContentHeaderVisible : true,
        isContentBorderVisible : false,
        whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
        whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
        whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    public dashboardWindow2Config : IGDWindowConfig = 
    {
        className              : 'gd-chart2',
        title                  : 'pie 1',
        isOpened               : true,
        isModal                : false,
        isResizable            : false,
        width                  : 566,
        height                 : 290,
        isScrollBarsVisible    : false,
        isMinimizeVisible      : true,
        isFooterVisible        : false,
        isHeaderVisible        : false,
        isContentHeaderVisible : true,
        isContentBorderVisible : false,
        whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
        whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
        whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    public dashboardWindow3Config : IGDWindowConfig = 
    {
            className               : 'gd-chart3',
            isOpened                : true,
            isModal                 : false,
            isResizable             : false,
            width                   : 566,
            height                  : 290,
            isScrollBarsVisible     : false,
            isMinimizeVisible       : true,
            isHeaderVisible         : false,
            isFooterVisible         : false,
            isContentHeaderVisible  : true,
            isContentBorderVisible  : false,
            whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
            whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
            whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    public dashboardWindow4Config : IGDWindowConfig = 
    {
            className               : 'gd-chart4',
            isOpened                : true,
            isModal                 : false,
            isResizable             : false,
            width                   : 566,
            height                  : 290,
            isScrollBarsVisible     : false,
            isMinimizeVisible       : true,
            isHeaderVisible         : false,
            isFooterVisible         : false,
            isContentHeaderVisible  : true,
            isContentBorderVisible  : false,
            whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
            whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
            whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    public dashboardWindow5Config : IGDWindowConfig = 
    {
            className               : 'gd-chart5',
            isOpened                : true,
            isModal                 : false,
            isResizable             : false,
            width                   : 566,
            height                  : 290,
            isScrollBarsVisible     : false,
            isMinimizeVisible       : true,
            isHeaderVisible         : false,
            isFooterVisible         : false,
            isContentHeaderVisible  : true,
            isContentBorderVisible  : false,
            whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
            whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
            whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    public dashboardWindow6Config : IGDWindowConfig = 
    {
            className               : 'gd-chart6',
            title                   : 'line 2',
            isOpened                : true,
            isModal                 : false,
            isResizable             : false,
            width                   : 566,
            height                  : 290,
            isScrollBarsVisible     : false,
            isMinimizeVisible       : true,
            isHeaderVisible         : false,
            isFooterVisible         : false,
            isContentHeaderVisible  : true,
            isContentBorderVisible  : false,
            whenHeaderClick   : (data: any) => { this.dashboard?.ReorderDashboard(data); },
            whenCloseClick    : (data: any) => { this.dashboard?.DeleteWindow(data);     },
            whenMinimizeClick : (data: any) => { this.dashboard?.onChildMinimize(data);  }
    };  

    constructor( private cd              : ChangeDetectorRef, 
                 private commonService   : GDCommonService, 
                 private themeService    : GDThemeService, 
                 private locationStrategy: LocationStrategy )
    {
        // this.PageWidth  = window.innerWidth  - 2;
        // this.PageHeight = window.innerHeight - 2;

        // this.resizeObservable = fromEvent(window, 'resize')
        // this.resizeSubscription = this.resizeObservable.subscribe( evt => 
        // {
        // this.PageWidth  = (evt.currentTarget as Window).innerWidth  - 2;
        // this.PageHeight = (evt.currentTarget as Window).innerHeight - 2;

        // this.ContainerSize = { w : this.PageWidth, h : this.PageHeight };
    }

    public SetActiveWindowID( id : string ) {        this.commonService.SetActiveWindowID( id ); }
    public GetActiveWindowID()              { return this.commonService.GetActiveWindowID();     }

    public  ngAfterViewInit() : void
    {
        // prevent back button
                                                  history.pushState( null, '', location.href );
        this.locationStrategy.onPopState( () => { history.pushState( null, '', location.href ); });

        // disable browser contextmenu
        document.addEventListener( 'contextmenu',  (event : any) => event.preventDefault() );  
        window  .addEventListener( 'beforeunload', (event : any) => { this.commonService.onBeforeBrowserClose() } );   

        this.themeService.setDarkTheme();

        this.openDashboard();
        this.openAbout();
        
        this.graphic1.SetTheme('dark');
        this.graphic2.SetTheme('dark');
        this.graphic3.SetTheme('dark');
        this.graphic4.SetTheme('dark');
    }

    public  ngOnDestroy()
    {
    }

    public  onClickTheme()
    {
        this.themeService.changeTheme();
        let                     theme = this.themeService.getActiveTheme();
        this.graphic1.SetTheme( theme.name );
        this.graphic2.SetTheme( theme.name );
        this.graphic3.SetTheme( theme.name );
        this.graphic4.SetTheme( theme.name );
    }

    private openDashboard() : void 
    { 
        if( ! this.dashboardWindow ) return;

        this.showDashboard = true;

        this.dashboardWindow.X = 40;
        this.dashboardWindow.Y = 60;
        
        this.dashboardWindow.Open(); 

        this.commonService.OpenedWindowsManager( this.dashboardWindow, 'open' );       
       
        setTimeout(() =>
        { 
            if( this.dashboard )
            {
                this.dashboard.InitContent();
                this.dashboard.AddWindow( this.dashboardChild1, this.graphic1, 1 );
                this.dashboard.AddWindow( this.dashboardChild2, this.graphic2, 2 );
                this.dashboard.AddWindow( this.dashboardChild3, this.graphic3, 3 );
                this.dashboard.AddWindow( this.dashboardChild4, this.graphic4, 4 );
                this.dashboard.AddWindow( this.dashboardChild5, this.graphic5, 5 );
                this.dashboard.AddWindow( this.dashboardChild6, this.graphic6, 6 );

                this.graphic1.SetTheme('dark');
            }
        }, 50);

        this.cd.detectChanges();
    }

    private openAbout() : void 
    { 
        if( ! this.aboutWindow          ) return;
        if(   this.aboutWindow.IsOpened ) return;

        this.aboutWindow.X = 1280;
        this.aboutWindow.Y = 60;
        
        this.aboutWindow.Open(); 

        this.commonService.OpenedWindowsManager(this.aboutWindow, 'open');        
    }
}
