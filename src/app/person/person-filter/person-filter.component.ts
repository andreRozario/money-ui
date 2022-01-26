import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PersonFilter, PersonService } from '../person.service';

@Component({
  selector: 'app-person-filter',
  templateUrl: './person-filter.component.html',
  styleUrls: ['./person-filter.component.css']
})
export class PersonFilterComponent implements OnInit {

  filter: PersonFilter = new PersonFilter();

  persons = Array();

  totalElements: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private service: PersonService
  ) { }

  ngOnInit(): void {

  }

  findByNameContaining(page: number = 0): Promise<any> {

    this.filter.page = page;

    return this.service.findByNameContaining(this.filter).then(result => {

      this.persons = result.content,
      this.totalElements = result.totalElements

    }).catch(error => this.errorHandler.handle(error));
  }

  onPageChange(page: number) {

    this.findByNameContaining(page);
  }

  statusUpdate(person: any) {

    const status = !person.status;

    return this.service.statusUpdate(person.id, status).then(() => {

      const action = status ? 'ativada' : 'inativada';

      person.status = status;

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: `Pessoa ${action} com sucesso!`, icon: 'pi-check-circle' });

    }).catch(error => this.errorHandler.handle(error));
  }

  confirmation(object: any) {

    this.confirmationService.confirm({

      message: 'Tem certeza que deseja excluir esta Pessoa ?',

      accept: () => {

        this.deleteById(object);
      }
    });
  }

  deleteById(object: any) {

    return this.service.deleteById(object.person.id).then(() => {

      object.grid.reset();

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Pessoa excluída dos registros!', icon: 'pi-check-circle' });

    }).catch(error => this.errorHandler.handle(error));
  }
}
