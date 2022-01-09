import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { EntryCreateComponent } from './entry-create/entry-create.component';
import { EntryFilterComponent } from './entry-filter/entry-filter.component';
import { PersonFilterComponent } from './person-filter/person-filter.component';
import { PersonCreateComponent } from './person-create/person-create.component';
import { MessageComponent } from './message/message.component';
import { EntryDatatableComponent } from './entry-datatable/entry-datatable.component';
import { PersonDatatableComponent } from './person-datatable/person-datatable.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EntryCreateComponent,
    EntryFilterComponent,
    PersonFilterComponent,
    PersonCreateComponent,
    MessageComponent,
    EntryDatatableComponent,
    PersonDatatableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    TooltipModule,

    MenuModule,
    MenubarModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
