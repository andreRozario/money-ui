import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from '../security/app-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {

    let message!: string;

    let level: string = 'error';

    if (typeof errorResponse === 'string') {

      message = errorResponse;

    }  else if (errorResponse instanceof NotAuthenticatedError) {

      console.log('Refresh Token expirado');

      message = 'Sua sessão está expirada!';

      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse) {

      if (errorResponse.status >= 400 && errorResponse.status <= 499) {

        message = 'Erro ao processar solicitação!';

        if (errorResponse.status === 403)

          message = 'Você não possui a permissão necessária para executar esta ação!';

        level = 'warn';
      }

      try {

        message = errorResponse.error[0].userMessage;

      } catch (e) {

      } finally {

        console.error('Ocorreu um erro:', errorResponse);
      }

    } else {

      message = 'Erro ao processar serviço remoto! Tente novamente dentro de alguns minutos.';

      console.error('Ocorreu um erro: ', errorResponse);
    }

    this.messageService.add({ severity: level, summary: 'Atenção!', detail: message, icon: 'pi-exclamation-circle' });
  }
}
