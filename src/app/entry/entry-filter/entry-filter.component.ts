import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';

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

  constructor(
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private service: EntryService
  ) { }

  ngOnInit(): void {

  }

  summarize(page: number = 0): Promise<any> {

    this.filter.page = page;

    return this.service.summarize(this.filter).then(result => {

      this.entries = result.content,
      this.totalElements = result.totalElements

    }).catch(error => this.errorHandler.handle(error));
  }

  onPageChange(page: number) {

    this.summarize(page);
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
}
