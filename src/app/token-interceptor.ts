import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from './auth/shared/auth.service';
import {catchError, switchMap, take, filter} from "rxjs/operators";
import {LoginResponse} from './auth/login/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      this.addToken(req, this.authService.getJwtToken());
    }

    return next.handle(req).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 403) {
        return this.handelAuthErrors(req, next);
      } else {
        return throwError(err);
      }
    }))
  }

  private handelAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
          return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
        })
      )
    } else {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap((res) => {
          return next.handle(this.addToken(req,
            this.authService.getJwtToken()))
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
  }

}
