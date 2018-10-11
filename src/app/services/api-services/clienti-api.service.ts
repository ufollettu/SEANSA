import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from '../../models/cliente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api/clienti';

@Injectable({
  providedIn: 'root'
})
export class ClientiApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error);

  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getCustomers(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getCustomer(id: string): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cliente>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postCustomer(data): Observable<Cliente> {
    return this.http.post<Cliente>(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCustomer(id: number, data): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;
    return this.http.put<Cliente>(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCustomer(id: number): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Cliente>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
