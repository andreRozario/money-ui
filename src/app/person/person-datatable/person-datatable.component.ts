import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-person-datatable',
  templateUrl: './person-datatable.component.html',
  styleUrls: ['./person-datatable.component.css']
})
export class PersonDatatableComponent {

  @Input() persons: any[] = [];

  @Input() size!: number;

  @Input() totalElements!: number;

  @Output() onLazyLoad = new EventEmitter();

  @Output() onDelete = new EventEmitter();

  @Output() onStatusUpdate = new EventEmitter();

  @ViewChild('table') grid!: Table;

  constructor(private auth: AuthService) {

  }

  LazyLoadEmmiter(event: LazyLoadEvent): void {

    const page: number = (event.first! / event.rows!);

    this.onLazyLoad.emit(page);
  }

  DeleteByIdEmitter(object: any): void { // object = { person, grid }

    this.onDelete.emit(object);
  }

  StatusUpdateEmitter(person: any): void { // person = { person.id, person.status, ... }

    this.onStatusUpdate.emit(person);
  }

  hasNoPermission(permission: string) {

    return !this.auth.hasAuthority(permission);
  }
}
