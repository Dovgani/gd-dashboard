import { NgModule                 } from '@angular/core';
import { GDGraphWrapper1Component } from './gd-graph-wrapper1.component';
import { GDCommonModule           } from 'gd-common';
import { GDGraphicModule          } from 'gd-graphic';
import { GDTooltipModule          } from 'gd-tooltip';

@NgModule({
  declarations: [GDGraphWrapper1Component],
  imports: [
    GDCommonModule,
    GDTooltipModule,
    GDGraphicModule
  ],
  exports: [GDGraphWrapper1Component]
})
export class GDGraphWrapper1Module { }
