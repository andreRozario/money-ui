import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

  constructor(private service: EntryService) { }

  ngOnInit(): void {

    // this.summarize();
  }

  summarize(page: number = 0): Promise<any> {

    this.filter.page = page;

    return this.service.summarize(this.filter).then(result => {

      this.entries = result.content,
      this.totalElements = result.totalElements
    });
  }

  onPageChange(page: number) {

    this.summarize(page);
  }
}
