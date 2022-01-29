import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';

import { PersonRoutingModule } from './person-routing.module';

import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonFilterComponent } from './person-filter/person-filter.component';
import { PersonDatatableComponent } from './person-datatable/person-datatable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TagModule,
    TooltipModule,

    SharedModule,

    PersonRoutingModule
  ],
  declarations: [
    PersonCreateComponent,
    PersonFilterComponent,
    PersonDatatableComponent
  ],
  exports: []
})
export class PersonModule { }
