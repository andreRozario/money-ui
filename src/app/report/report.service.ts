import { Injectable } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

export class EntryByPersonFilter {

  initialDate?: Date;

  finalDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  url = `${environment.domain}/entries`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  reportByPerson(filter: EntryByPersonFilter): Promise<any> {

    let params = new HttpParams()
                      .set('initialDate', this.datePipe.transform(filter.initialDate, 'yyyy-MM-dd')!)
                      .set('finalDate', this.datePipe.transform(filter.finalDate, 'yyyy-MM-dd')!);

    return firstValueFrom(this.http.get(`${this.url}/reports/by-person`, { params, responseType: 'blob' })).then((response: any) => response);
  }
}
