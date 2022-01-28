import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';

import { Person } from '../_model/person';

export class PersonFilter {

   name?: string;

   page: number = 0;

   size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  findByNameContaining(filter: PersonFilter): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    let params = new HttpParams();

    params = params.set('page', filter.page);
    params = params.set('size', filter.size);

    if (filter.name)

      params = params.set('name', filter.name);

    return firstValueFrom(this.http.get(`${this.url}`, { headers, params })).then((response: any) => {

      const content = response['content'];

      const pagination = response;

      const result = {

        content: content,

        totalElements: pagination['totalElements']
      }

      return result;
    });
  }

  findAll(): Promise<any> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    return firstValueFrom(this.http.get(`${this.url}`, { headers })).then((response: any) => response['content']);
  }

  save(person: Person): Promise<Person> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu')
      .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.post<Person>(this.url, person, { headers })).then((response: Person) => {

      return response;
    });
  }

  statusUpdate(id: number, status: boolean): Promise<void> {

    const headers = new HttpHeaders()
                          .append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu')
                          .append('Content-Type', 'application/json');

    return firstValueFrom(this.http.patch(`${this.url}/${id}/status`, status, { headers })).then(() => {});
  }

  deleteById(id: number): Promise<void> {

    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AbW9uZXkuY29tOmFkbWlu');

    return firstValueFrom(this.http.delete(`${this.url}/${id}`, { headers })).then(() => {});
  }
}
