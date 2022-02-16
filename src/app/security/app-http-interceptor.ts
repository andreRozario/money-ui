import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { from, mergeMap, Observable } from "rxjs";

import { AuthService } from "./auth.service";

export class NotAuthenticatedError {}

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.router.url !== '/')

      if (this.auth.isAccessTokenNotValid() && !request.url.includes('/oauth/token')) {

        return from(this.auth.refreshToken()).pipe(mergeMap(() => {

          if (this.auth.isAccessTokenNotValid())

            throw new NotAuthenticatedError();

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          return next.handle(request);
        }));
      }

    return next.handle(request);
  }
}
