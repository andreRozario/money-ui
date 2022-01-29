import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Entry } from '../_model/entry';

export class EntryFilter {

   description?: string;

   dueDateFrom?: Date;

   dueDateTo?: Date;

   page: number = 0;

   size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  url = 'http://localhost:8080/entries';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  summarize(filter: EntryFilter): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    let params = new HttpParams();

    params = params.set('page', filter.page);
    params = params.set('size', filter.size);

    if (filter.description)

      params = params.set('description', filter.description);

    if (filter.dueDateFrom)

      params = params.set('dueDateFrom', this.datePipe.transform(filter.dueDateFrom, 'yyyy-MM-dd')!);

    if (filter.dueDateTo)

      params = params.set('dueDateTo', this.datePipe.transform(filter.dueDateTo, 'yyyy-MM-dd')!);

    return firstValueFrom(this.http.get(`${this.url}?summarize`, { headers, params })).then((response: any) => {

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

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    return firstValueFrom(this.http.get<Entry>(`${this.url}/${id}`, { headers })).then((response: Entry) => {

      return response
    });
  }

  save(entry: Entry): Promise<Entry> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Entry>(this.url, Entry.dateFormat(entry, this.datePipe), { headers })).then((response: Entry) => response);
  }

  update(entry: Entry): Promise<Entry> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.put<Entry>(`${this.url}/${entry.id}`, Entry.dateFormat(entry, this.datePipe), { headers })).then((response: Entry) => response);
  }

  deleteById(id: number) {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    return firstValueFrom(this.http.delete(`${this.url}/${id}`, { headers })).then(() => null);
  }
}

// cd C:\Users\HellBoy\Documents\Development\Workspace-STS-4-4.13.0\money-api\target

// java -jar money-api-1.0.0-SNAPSHOT.jar --spring.datasource.username=root --spring.datasource.password --moneyapi.allowed-web-application-origin=http://localhost:4200 --spring.profiles.active=oauth-security
