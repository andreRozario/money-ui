import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = 'http://localhost:8080/states';

  constructor(private http: HttpClient) { }

  findAll(): Promise<any> {

    return firstValueFrom(this.http.get(`${this.url}`));
  }
}
