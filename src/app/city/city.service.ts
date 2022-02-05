import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';
import { City } from '../_model/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = `${environment.domain}/cities`;

  constructor(private http: HttpClient) {}

  findByStateId(state: number): Promise<City[]> {

    let params = new HttpParams();

    if (state)

      params = params.set('state', state);

    return firstValueFrom(this.http.get<Array<City>>(`${this.url}`, { params }));
  }
}
