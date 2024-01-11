import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';
import { DatePipe                } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GDAccordionModule       } from 'gd-accordion';
import { GDWindowModule          } from 'gd-window';
import { GDWindowRef             } from 'gd-window';
import { GDDashboardModule       } from 'gd-dashboard';

import { GDGraphWrapper1Module   } from 'projects/gd-graph-wrapper1/src/lib/gd-graph-wrapper1.module';
import { GDGraphWrapper2Module   } from 'projects/gd-graph-wrapper2/src/lib/gd-graph-wrapper2.module';
import { GDGraphWrapper3Module   } from 'projects/gd-graph-wrapper3/src/lib/gd-graph-wrapper3.module';
import { GDGraphWrapper4Module   } from 'projects/gd-graph-wrapper4/src/lib/gd-graph-wrapper4.module';

import { AppComponent            } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GDGraphWrapper1Module,
    GDGraphWrapper2Module,
    GDGraphWrapper3Module,
    GDGraphWrapper4Module,
    GDDashboardModule,
    GDAccordionModule,
    GDWindowModule
  ],
  providers: [
    GDWindowRef,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
