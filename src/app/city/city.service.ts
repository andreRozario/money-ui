import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = 'http://localhost:8080/cities';

  constructor(private http: HttpClient) {}

  findByStateId(state: number): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    let params = new HttpParams();

    if (state)

      params = params.set('state', state);

    return firstValueFrom(this.http.get(`${this.url}`, { headers, params })).then((response: any) => response);
  }
}
