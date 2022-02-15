import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-entry-datatable',
  templateUrl: './entry-datatable.component.html',
  styleUrls: ['./entry-datatable.component.css']
})
export class EntryDatatableComponent {

  @Input() entries: any[] = [];

  @Input() size!: number;

  @Input() totalElements!: number;

  @Input() loading!: boolean;

  @Output() onLazyLoad = new EventEmitter();

  @Output() onDelete = new EventEmitter();

  @Output() onReset = new EventEmitter();

  @ViewChild('table') grid!: Table;

  constructor(private auth: AuthService) { }

  lazyLoadEmitter(event: LazyLoadEvent) { // pageable = { page, sort: { field, order } }

    const page: number = (event.first! / event.rows!);

    const field: string = event.sortField ? event.sortField : 'id';

    const order: string = event.sortOrder === 1 ? 'ASC' : 'DESC';

    this.onLazyLoad.emit({ page, sort: { field, order } });
  }

  deleteByIdEmitter(object: any) { // object = { entry, grid }

    this.onDelete.emit(object);
  }

  resetEmitter(grid: any): void { // table

    this.onReset.emit(grid);
  }

  hasNoPermission(permission: string) {

    return !this.auth.hasAuthority(permission);
  }
}
