import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NavbarComponent } from './navbar/navbar.component';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { CategoryService } from '../category/category.service';
import { EntryService } from '../entry/entry.service';
import { PersonService } from '../person/person.service';

import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,

    ButtonModule,
    ConfirmDialogModule,
    MenuModule,
    MenubarModule,
    SharedModule,
    SidebarModule,
    ToastModule,
    TooltipModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    ConfirmDialogModule,
    ToastModule,

    NavbarComponent
  ],
  providers: [
    ConfirmationService,
    DatePipe,
    MessageService,
    TranslateService,

    ErrorHandlerService,
    CategoryService,
    EntryService,
    PersonService,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
