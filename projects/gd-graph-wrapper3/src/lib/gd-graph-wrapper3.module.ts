import { NgModule                 } from '@angular/core';
import { GDGraphWrapper3Component } from './gd-graph-wrapper3.component';
import { GDCommonModule           } from 'gd-common';
import { GDGraphicModule          } from 'gd-graphic';
import { GDTooltipModule          } from 'gd-tooltip';

@NgModule({
  declarations: [GDGraphWrapper3Component],
  imports: [
    GDCommonModule,
    GDTooltipModule,
    GDGraphicModule
  ],
  exports: [GDGraphWrapper3Component]
})
export class GDGraphWrapper3Module {}
