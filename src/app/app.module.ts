import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { EntryModule } from './entry/entry.module';
import { PersonModule } from './person/person.module';

import { EntryService } from './entry/entry.service';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    CoreModule,
    EntryModule,
    PersonModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    EntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
