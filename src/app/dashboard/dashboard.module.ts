import { NgModule } from '@angular/core';

import { CommonModule, DecimalPipe } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';

import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,

    ChartModule,
    PanelModule,

    SharedModule,

    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }
