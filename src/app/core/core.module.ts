import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

import { NavbarComponent } from './navbar/navbar.component';

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
  ]
})
export class CoreModule { }
