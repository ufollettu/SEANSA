import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Rinnovo } from "../../models/rinnovo";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/rinnovi";

@Injectable({
  providedIn: "root"
})
export class RinnoviApiService {
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

  getRinnovi(): Observable<Rinnovo[]> {
    return this.http.get<Rinnovo[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getRinnovo(id: number): Observable<Rinnovo> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Rinnovo>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postRinnovo(data): Observable<Rinnovo> {
    return this.http
      .post<Rinnovo>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateRinnovo(id: number, data): Observable<Rinnovo> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<Rinnovo>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteRinnovo(id: number): Observable<Rinnovo> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<Rinnovo>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
