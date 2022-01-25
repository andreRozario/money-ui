import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-entry-datatable',
  templateUrl: './entry-datatable.component.html',
  styleUrls: ['./entry-datatable.component.css']
})
export class EntryDatatableComponent {

  @Input() entries: any[] = [];

  @Input() size!: number;

  @Input() totalElements!: number;

  @Output() onLazyLoad = new EventEmitter();

  LazyLoadEmmiter(event: LazyLoadEvent) {

    const page: number = (event.first! / event.rows!);

    this.onLazyLoad.emit(page);
  }
}
