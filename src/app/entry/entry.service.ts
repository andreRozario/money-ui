import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface EntryFilter {

   description?: string;

   dueDateFrom?: Date;

   dueDateTo?: Date;
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

    if (filter.description)

      params = params.set('description', filter.description);

    if (filter.dueDateFrom)

      params = params.set('dueDateFrom', this.datePipe.transform(filter.dueDateFrom, 'yyyy-MM-dd')!);

    if (filter.dueDateTo)

      params = params.set('dueDateTo', this.datePipe.transform(filter.dueDateTo, 'yyyy-MM-dd')!);

    return firstValueFrom(this.http.get(`${this.url}?summarize`, { headers, params })).then((response: any) => response['content']);
  }
}

// cd C:\Users\HellBoy\Documents\Development\Workspace-STS-4-4.13.0\money-api\target

// java -jar money-api-1.0.0-SNAPSHOT.jar --spring.datasource.username=root --spring.datasource.password --moneyapi.allowed-web-application-origin=http://localhost:4200 --spring.profiles.active=oauth-security
