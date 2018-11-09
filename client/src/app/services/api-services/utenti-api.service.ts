import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Utente } from "../../models/utente";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/utenti";

@Injectable({
  providedIn: "root"
})
export class UtentiApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    // return throwError('Something bad happened; please try again later.');
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getUtente(id: number): Observable<Utente> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Utente>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postUtente(data): Observable<Utente> {
    return this.http
      .post<Utente>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUtente(id: number, data): Observable<Utente> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<Utente>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUtente(id: number): Observable<Utente> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<Utente>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
