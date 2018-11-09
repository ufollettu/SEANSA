import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Packs } from "../../models/packs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/packs";

@Injectable({
  providedIn: "root"
})
export class PacksApiService {
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

  getPacks(): Observable<Packs[]> {
    return this.http.get<Packs[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPack(id: number): Observable<Packs> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Packs>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPackFromOwnerId(id: number): Observable<Packs[]> {
    const url = `${apiUrl}/user/${id}`;
    return this.http.get<Packs[]>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPack(data): Observable<Packs> {
    return this.http
      .post<Packs>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePack(id: number, data): Observable<Packs> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<Packs>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePack(id: number): Observable<Packs> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<Packs>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
