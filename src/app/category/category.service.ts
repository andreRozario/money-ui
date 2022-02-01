import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = `${environment.domain}/categories`;

  constructor(private http: HttpClient) { }

  findAll(): Promise<any> {

    return firstValueFrom(this.http.get(`${this.url}`));
  }
}
