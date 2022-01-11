import { NgModule, LOCALE_ID } from '@angular/core';

import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

import { NavbarComponent } from './navbar/navbar.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    CommonModule,

    ButtonModule,
    TooltipModule,
    MenuModule,
    MenubarModule,
    SharedModule,
    SidebarModule,
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
