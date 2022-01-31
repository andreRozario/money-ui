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

    let params = new HttpParams();

    params = params.set('page', filter.page);
    params = params.set('size', filter.size);

    if (filter.name)

      params = params.set('name', filter.name);

    return firstValueFrom(this.http.get(`${this.url}`, { params })).then((response: any) => {

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

    return firstValueFrom(this.http.get(`${this.url}`)).then((response: any) => response['content']);
  }

  findById(id: number): Promise<Person> {

    return firstValueFrom(this.http.get<Person>(`${this.url}/${id}`)).then((response: Person) => {

      return response
    });
  }

  save(person: Person): Promise<Person> {

    return firstValueFrom(this.http.post<Person>(this.url, person)).then((response: Person) => response);
  }

  update(person: Person): Promise<Person> {

    return firstValueFrom(this.http.put<Person>(`${this.url}/${person.id}`, person)).then((response: Person) => response);
  }

  statusUpdate(id: number, status: boolean): Promise<void> {

    return firstValueFrom(this.http.patch(`${this.url}/${id}/status`, status)).then(() => {});
  }

  deleteById(id: number): Promise<void> {

    return firstValueFrom(this.http.delete(`${this.url}/${id}`)).then(() => {});
  }
}
