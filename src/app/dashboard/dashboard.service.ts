import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url = `${environment.domain}/entries`;

  constructor(private http: HttpClient) {}

  countByCategory(): Promise<Array<any>> {

    return firstValueFrom(this.http.get(`${this.url}/statistics/by-category`)).then((response: any) => response);
  }

  countTypeByDay() {

    return firstValueFrom(this.http.get(`${this.url}/statistics/type-by-day`)).then((response: any) => {

      const data = response;

      this.stringToDate(data);

      return response;
    });
  }

  private stringToDate(data: Array<any>) {

    for (const d of data) {

      const from = d.date.split('-');

      d.date = new Date(from[0], (from[1] - 1), from[2]);
    }
  }
}
