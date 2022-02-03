import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';

import { ReportRoutingModule } from './report-routing.module';

import { SharedModule } from '../shared/shared.module';

import { EntryByPersonComponent } from './entry-by-person/entry-by-person.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ButtonModule,
    CalendarModule,
    CardModule,

    ReportRoutingModule,

    SharedModule
  ],
  declarations: [
    EntryByPersonComponent
  ]
})
export class ReportModule { }
