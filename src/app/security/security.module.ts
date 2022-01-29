import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from '../shared/shared.module';

import { SecurityRoutingModule } from './security-routing.module';

import { LoginComponent } from './login/login.component';

@NgModule({

  imports: [
    CommonModule,

    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    InputTextModule,

    SharedModule,

    SecurityRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class SecurityModule { }
