import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/oauth/token';

  payload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {

      this.tokenLoad();
    }

  login(username: string, password: string): Promise<void> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpBbmd1MUByXyE=')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `client=angular&username=${username}&password=${password}&grant_type=password`;

    return firstValueFrom(this.http.post(this.url, body, { headers, withCredentials: true })).then((response: any) => {

      this.tokenStore(response.access_token);

    }).catch(response => {

      if (response.status === 400)

        if(response.error.error === 'invalid_grant')

          return Promise.reject('Usuário inexistente ou senha inválida!');

      return Promise.reject(response);
    });
  }

  logout(): Promise<void> {

    const url = 'http://localhost:8080/tokens/revoke';

    return firstValueFrom(this.http.delete(url, { withCredentials: true })).then(() => {

      this.cleanAccessToken();
    });
  }

  hasAuthority(permission: string) {

    return this.payload && this.payload.authorities.includes(permission);
  }

  hasAnyAuthority(permissions: Array<string>) {

    for (const permission of permissions)

      if (this.hasAuthority(permission))

        return true;

    return false;
  }

  refreshToken(): Promise<void> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpBbmd1MUByXyE=')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(this.http.post(this.url, body, { headers, withCredentials: true })).then((response: any) => {

      this.tokenStore(response.access_token);

      console.log('Novo access token criado!');

      return Promise.resolve();

    }).catch(error => {

      console.log('Erro ao renovar token.', error);

      return Promise.resolve();
    });
  }

  cleanAccessToken() {

    localStorage.removeItem('token');

    this.payload = null;
  }

  isAccessTokenNotValid() {

    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  private tokenStore(token: string) {

    this.payload = this.jwtHelper.decodeToken(token);

    localStorage.setItem('token', token);
  }

  private tokenLoad() {

    const token = localStorage.getItem('token');

    if (token)

      this.tokenStore(token);
  }
}
