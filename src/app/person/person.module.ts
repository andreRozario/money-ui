import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from '../shared/shared.module';

import { PersonRoutingModule } from './person-routing.module';

import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonFilterComponent } from './person-filter/person-filter.component';
import { PersonDatatableComponent } from './person-datatable/person-datatable.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    TableModule,
    TooltipModule,

    SharedModule,

    PersonRoutingModule
  ],
  declarations: [
    PersonCreateComponent,
    PersonFilterComponent,
    PersonDatatableComponent,
    ContactCreateComponent
  ],
  exports: []
})
export class PersonModule { }
