import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Pc } from "../../models/pc";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/pc";

@Injectable({
  providedIn: "root"
})
export class PcApiService {
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

  // private extractData(res: Response): Pc[] {
  //   const body = <any[]>(res || []);
  //   const ret: Pc[] = [];
  //   body.forEach(itm => {
  //     ret.push(
  //       <Pc>{
  //         SP_ID: itm['SP_ID'],
  //         SP_HW_ID: itm['SP_HW_ID'],
  //         SP_LAST_RX: itm['SP_LAST_RX'],
  //         SP_IP: itm['SP_IP'],
  //         SP_STATUS: itm['SP_STATUS'],
  //         SP_PC_DATE_TIME: itm['SP_PC_DATE_TIME']
  //       }
  //     );
  //   });
  //   return ret;
  // }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getPcs(): Observable<Pc[]> {
    return this.http.get<Pc[]>(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getPc(id: number): Observable<Pc> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Pc>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postPc(data): Observable<Pc> {
    return this.http
      .post<Pc>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updatePc(id: number, data): Observable<Pc> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .put<Pc>(url, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deletePc(id: number): Observable<Pc> {
    const url = `${apiUrl}/${id}`;
    return this.http
      .delete<Pc>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getIpAddress() {
    return this.http
      .get<{ ip: string }>("https://jsonip.com")
      .pipe(catchError(this.handleError));
  }
}
