import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-datatable',
  templateUrl: './person-datatable.component.html',
  styleUrls: ['./person-datatable.component.css']
})
export class PersonDatatableComponent {

  @Input() persons: any[] = [];
}
