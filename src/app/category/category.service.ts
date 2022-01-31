import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) { }

  findAll(): Promise<any> {

    return firstValueFrom(this.http.get(`${this.url}`));
  }
}
