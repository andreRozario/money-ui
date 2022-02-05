import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { firstValueFrom } from 'rxjs';
import { State } from '../_model/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = `${environment.domain}/states`;

  constructor(private http: HttpClient) { }

  findAll(): Promise<State[]> {

    return firstValueFrom(this.http.get<Array<State>>(`${this.url}`));
  }
}
