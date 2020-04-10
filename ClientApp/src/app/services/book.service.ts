import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { Book } from '../models/book';
import { HttpErrorHandlerService } from '../@base/http-error-handler.service';
import { ServerResponse } from '../@base/server-response';
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  readonly bookUrl = 'api/Books';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService,
    private authService: AuthService
    ) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookUrl}`, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('Books receive'),
        catchError(this.httpErrorHandler.handleError<Book[]>('getBooks', [])))
      );
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.bookUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('Book receive')),
        catchError(this.httpErrorHandler.handleError<Book>('getBook', null))
      );
  }

  getOffers(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookUrl}/Offers`, this.httpOptions)
      .pipe(
        tap(_ => this.httpErrorHandler.log('Offers receive')),
        catchError(this.httpErrorHandler.handleError<Book[]>('getOffers', []))
      );
  }

  saveBook(book: Book): Observable<Book> {
    let token = this.authService.getToken();
    return this.http.post<Book>(`${this.bookUrl}?access_token=${token}`, book, this.httpOptions)
      .pipe(
        tap(_ => console.log('Book saved')),
        catchError(this.httpErrorHandler.handleError<Book>('saveBook', null))
      );
  }

  updateBook(book: Book): Observable<Book> {
    let token = this.authService.getToken();
    return this.http.put<Book>(`${this.bookUrl}/${book.id}?access_token=${token}`, book, this.httpOptions)
      .pipe(
        tap(_ => console.log('Book Updated')),
        catchError(this.httpErrorHandler.handleError<Book>('updateBook', null))
      );
  }

  deleteBook(id: string): Observable<Book> {
    let token = this.authService.getToken();
    return this.http.delete<Book>(`${this.bookUrl}/${id}?access_token=${token}`, this.httpOptions)
      .pipe(
        tap(_ => console.log('Book deleted')),
        catchError(this.httpErrorHandler.handleError<Book>('deleteBook', null))
      );
  }
}
