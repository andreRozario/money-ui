import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from 'src/app/security/auth.service';
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

  loading: boolean = true;

  @ViewChild('form') form!: NgForm;

  constructor(
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private service: PersonService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Pessoas');
  }

  findByNameContaining(page: number = 0): Promise<any> {

    this.filter.page = page;

    return this.service.findByNameContaining(this.filter).then(result => {

      this.persons = result.content,
      this.totalElements = result.totalElements

      this.loading = false;

    }).catch(error => this.errorHandler.handle(error));
  }

  onPageChange(page: number) {

    this.loading = true;

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

  reset(grid: any) {

    this.form.reset();

    grid.reset();
  }

  hasNoPermission(permission: string) {

    return !this.auth.hasAuthority(permission);
  }
}
