import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AuthService } from 'src/app/security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EntryFilter, EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-filter',
  templateUrl: './entry-filter.component.html',
  styleUrls: ['./entry-filter.component.css']
})
export class EntryFilterComponent implements OnInit {

  filter: EntryFilter = new EntryFilter();

  entries = Array();

  totalElements: number = 0;

  loading: boolean = true;

  @ViewChild('form') form!: NgForm;

  constructor(
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private service: EntryService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Lançamentos');
  }

  summarize(page: number = 0, field: string = 'id', order: string = 'ASC'): Promise<any> {

    this.filter.page = page;

    this.filter.sort.field = field;

    this.filter.sort.order = order;

    return this.service.summarize(this.filter).then(result => {

      this.entries = result.content;
      this.totalElements = result.totalElements;

      this.loading = false;

    }).catch(error => this.errorHandler.handle(error));

  }

  onPageChange(pageable: any) {

    this.loading = true;

    this.summarize(pageable.page, pageable.sort.field, pageable.sort.order);
  }

  confirmation(object: any) {

    this.confirmationService.confirm({

      message: 'Tem certeza que deseja excluir este Lançamento ?',

      accept: () => {

        this.deleteById(object);
      }
    });
  }

  deleteById(object: any) {

    return this.service.deleteById(object.entry.id).then(() => {

      object.grid.reset();

      this.messageService.add({ severity:'success', summary: 'Sucesso', detail: 'Lançamento excluído dos registros!', icon: 'pi-check-circle' });

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
