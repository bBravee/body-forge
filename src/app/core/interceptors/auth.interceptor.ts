import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private authToken: string = this.authService.loggedUser.accessToken!;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedUrl = req.urlWithParams;
    const params = new HttpParams({ fromString: clonedUrl }).set(
      'auth',
      this.authToken
    );

    const clonedRequest = req.clone({
      params,
    });

    return next.handle(clonedRequest);
  }
}
