import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { isNullOrUndefined } from "util";
import { HttpErrorHandlerService } from '../@base/http-error-handler.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authUrl = 'api/Users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandlerService) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}`, user, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('User registered')),
        catchError(this.httpErrorHandler.handleError<User>('registerUser', null))
      );
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/Login`, user, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('User try login')),
        catchError(this.httpErrorHandler.handleError<User>('loginUser', null))
      );
  }

  setUser(user: User): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem('currentUser', user_string);
  }

  getCurrentUser(): User {
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)) {
      let user: User = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  getToken(): string {
    let user: User = this.getCurrentUser();

    if (user) {
      return user.token;
    } else {
      return '';
    }
  }

  logoutUser(): Observable<User> {
    let currentUser: User = this.getCurrentUser();
    let accessToken = currentUser.token;
    this.removeUser();
    return this.http.post<User>(`${this.authUrl}/Logout`, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('User logout')),
        catchError(this.httpErrorHandler.handleError<User>('logoutUser', null))
      );
  }

  removeUser(): void {
    localStorage.removeItem('currentUser');
  }
}
