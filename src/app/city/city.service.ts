import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = `${environment.domain}/cities`;

  constructor(private http: HttpClient) {}

  findByStateId(state: number): Promise<any> {

    let params = new HttpParams();

    if (state)

      params = params.set('state', state);

    return firstValueFrom(this.http.get(`${this.url}`, { params }));
  }
}
