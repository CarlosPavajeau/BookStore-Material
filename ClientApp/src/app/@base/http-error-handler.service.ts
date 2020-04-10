import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor() { }

  handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error('Error in operation' + operation);
      console.error(error);
      return of(result as T);
    }
  }

  handleAndReturnError<T>() {
    return (error: any): Observable<T> => {
      return throwError(error);
    }
  }

  log(message: string) {
    console.log(message);
  }
}
