import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { SharedModule } from '../shared/shared.module';

import { SecurityRoutingModule } from './security-routing.module';

import { LoginComponent } from './login/login.component';

import { AppHttpInterceptor } from './app-http-interceptor';

export function tokenGetter(): string | null {

  return localStorage.getItem('token');
}

@NgModule({

  imports: [
    CommonModule,

    ReactiveFormsModule,

    ButtonModule,
    CardModule,
    InputTextModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: [ 'localhost:8080' ],
        disallowedRoutes: [ 'http://localhost:8080/oauth/token' ]
      }
    }),

    SharedModule,

    SecurityRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule { }
