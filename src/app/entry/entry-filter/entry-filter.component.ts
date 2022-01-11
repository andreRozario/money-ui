import { Component, OnInit } from '@angular/core';
import { EntryFilter, EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-filter',
  templateUrl: './entry-filter.component.html',
  styleUrls: ['./entry-filter.component.css']
})
export class EntryFilterComponent implements OnInit {

  description?: string;

  dueDateFrom?: Date;

  dueDateTo?: Date;

  entries = Array();

  constructor(private service: EntryService) { }

  ngOnInit(): void {

    this.summarize();
  }

  summarize(): Promise<any> {

    const filter: EntryFilter = {

      description: this.description,

      dueDateFrom: this.dueDateFrom,

      dueDateTo: this.dueDateTo
    }

    return this.service.summarize(filter).then(entries => this.entries = entries);
  }
}
