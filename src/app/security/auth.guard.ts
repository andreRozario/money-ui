import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isAccessTokenNotValid()) {

      console.log('Navegação com access token inválido. Obtendo novo access token...');

      return this.auth.refreshToken().then(() => {

        if (this.auth.isAccessTokenNotValid()) {

          this.router.navigate(['/login']);

          return false;
        }

        return true;
      });
    }

    if (route.data['permissions'] && this.auth.hasAnyAuthority(route.data['permissions']))

      return true;

    this.router.navigate(['/forbiddden-access']);

    return false;
  }
}
