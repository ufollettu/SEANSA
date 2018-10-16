import { PacksHistory } from "./../../models/packs-history";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/packs-history";

@Injectable({
  providedIn: "root"
})
export class PacksHistoryApiService {
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

  getPacks(): Observable<PacksHistory[]> {
    return this.http.get<PacksHistory[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPack(id: number): Observable<PacksHistory> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<PacksHistory>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPackFromOwnerId(id: number): Observable<PacksHistory[]> {
    const url = `${apiUrl}/user/${id}`;
    return this.http.get<PacksHistory[]>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPack(data): Observable<PacksHistory> {
    return this.http
      .post<PacksHistory>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePack(id: number, data): Observable<PacksHistory> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<PacksHistory>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePack(id: number): Observable<PacksHistory> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<PacksHistory>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
}
