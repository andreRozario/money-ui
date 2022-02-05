import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';

import { EntryRoutingModule } from './entry-routing.module';

import { EntryCreateComponent } from './entry-create/entry-create.component';
import { EntryFilterComponent } from './entry-filter/entry-filter.component';
import { EntryDatatableComponent } from './entry-datatable/entry-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    FileUploadModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    ProgressBarModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    TooltipModule,

    SharedModule,

    EntryRoutingModule
  ],
  declarations: [
    EntryCreateComponent,
    EntryFilterComponent,
    EntryDatatableComponent
  ],
  exports: []
})
export class EntryModule { }
