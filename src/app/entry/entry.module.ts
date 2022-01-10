import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';

import { EntryCreateComponent } from './entry-create/entry-create.component';
import { EntryFilterComponent } from './entry-filter/entry-filter.component';
import { EntryDatatableComponent } from './entry-datatable/entry-datatable.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    TooltipModule,

    SharedModule
  ],
  declarations: [
    EntryCreateComponent,
    EntryFilterComponent,
    EntryDatatableComponent
  ],
  exports: [
    EntryCreateComponent,
    EntryFilterComponent,
  ],
})
export class EntryModule { }
