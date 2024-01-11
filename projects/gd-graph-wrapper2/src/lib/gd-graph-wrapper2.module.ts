import { NgModule                 } from '@angular/core';
import { GDGraphWrapper2Component } from './gd-graph-wrapper2.component';
import { GDCommonModule           } from 'gd-common';
import { GDGraphicModule          } from 'gd-graphic';
import { GDTooltipModule          } from 'gd-tooltip';

@NgModule({
  declarations: [GDGraphWrapper2Component],
  imports: [
    GDCommonModule,
    GDTooltipModule,
    GDGraphicModule
  ],
  exports: [GDGraphWrapper2Component]
})
export class GDGraphWrapper2Module { }
