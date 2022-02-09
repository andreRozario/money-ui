import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';

import { Entry } from '../_model/entry';

export class EntryFilter {

   description?: string;

   dueDateFrom?: Date;

   dueDateTo?: Date;

   page: number = 0;

   size: number = 5;

   sort: any = {

    field: 'id',

    order: 'ASC'
   }
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  url = `${environment.domain}/entries`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  summarize(filter: EntryFilter): Promise<any> {

    let params = this.setParams(filter, new HttpParams());

    return firstValueFrom(this.http.get(`${this.url}?summarize`, { params })).then((response: any) => {

      const content = response['content'];

      const pagination = response;

      const result = {

        content: content,

        totalElements: pagination['totalElements']
      }

      return result;
    });
  }

  findById(id: number): Promise<Entry> {

    return firstValueFrom(this.http.get<Entry>(`${this.url}/${id}`)).then((response: Entry) => {

      return response
    });
  }

  save(entry: Entry): Promise<Entry> {

    return firstValueFrom(this.http.post<Entry>(this.url, Entry.dateFormat(entry, this.datePipe))).then((response: Entry) => response);
  }

  update(entry: Entry): Promise<Entry> {

    return firstValueFrom(this.http.put<Entry>(`${this.url}/${entry.id}`, Entry.dateFormat(entry, this.datePipe))).then((response: Entry) => response);
  }

  deleteById(id: number): Promise<void> {

    return firstValueFrom(this.http.delete(`${this.url}/${id}`)).then(() => {});
  }

  uploadHeaders(): HttpHeaders {

    return new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  uploadURL(): string {

    return `${this.url}/attachment`;
  }

  private setParams(filter: EntryFilter, params: HttpParams): HttpParams {

    params = params.set('page', filter.page);
    params = params.set('size', filter.size);

    if (filter.description)

      params = params.set('description', filter.description);

    if (filter.dueDateFrom)

      params = params.set('dueDateFrom', this.datePipe.transform(filter.dueDateFrom, 'yyyy-MM-dd')!);

    if (filter.dueDateTo)

      params = params.set('dueDateTo', this.datePipe.transform(filter.dueDateTo, 'yyyy-MM-dd')!);

      params = params.set('sort', `${filter.sort.field},${filter.sort.order}`);

    return params;
  }
}
