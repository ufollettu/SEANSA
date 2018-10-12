import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Matricola } from "../../models/matricola";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/matricole";

@Injectable({
  providedIn: "root"
})
export class MatricoleApiService {
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

  getMatricole(): Observable<Matricola[]> {
    return this.http.get<Matricola[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMatricoleBySks(sksId: number): Observable<Matricola[]> {
    const url = `${apiUrl}/${sksId}`;
    console.log(url);
    return this.http.get<Matricola[]>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postMatricola(data): Observable<Matricola> {
    return this.http
      .post<Matricola>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateMatricola(id: number, data): Observable<Matricola> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<Matricola>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteMatricola(id: number): Observable<Matricola> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<Matricola>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
