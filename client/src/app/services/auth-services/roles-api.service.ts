import { UtentiPermessi } from "../../models/utenti-permessi";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/roles";

@Injectable({
  providedIn: "root"
})
export class RolesApiService {
  constructor(private http: HttpClient) { }

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

  // getKeys(): Observable<any> {
  //   return this.http.get(apiUrl, httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }

  // getKey(id: string): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get(url, httpOptions).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError));
  // }

  postKey(data): Observable<UtentiPermessi> {
    return this.http
      .post<UtentiPermessi>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateKeys(id: number, data): Observable<UtentiPermessi> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<UtentiPermessi>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // deleteKey(id: string): Observable<{}> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
}
