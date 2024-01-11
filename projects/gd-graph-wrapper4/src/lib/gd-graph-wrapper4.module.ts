import { NgModule                 } from '@angular/core';
import { GDGraphWrapper4Component } from './gd-graph-wrapper4.component';
import { GDCommonModule           } from 'gd-common';
import { GDGraphicModule          } from 'gd-graphic';
import { GDTooltipModule          } from 'gd-tooltip';

@NgModule({
  declarations: [GDGraphWrapper4Component],
  imports: [
    GDCommonModule,
    GDTooltipModule,
    GDGraphicModule
  ],
  exports: [GDGraphWrapper4Component]
})
export class GDGraphWrapper4Module { }
