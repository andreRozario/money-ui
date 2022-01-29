import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NavbarComponent } from './navbar/navbar.component';

import { ConfirmationService, MessageService } from 'primeng/api';

import localePt from '@angular/common/locales/pt';
import { PageNotFoundComponent } from './page-not-found.component';

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
    RouterModule,
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
    NavbarComponent,
    PageNotFoundComponent
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

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
