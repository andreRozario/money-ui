import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-datatable',
  templateUrl: './entry-datatable.component.html',
  styleUrls: ['./entry-datatable.component.css']
})
export class EntryDatatableComponent {

  @Input() entries: any[] = [];
}
