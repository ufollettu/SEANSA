import { CustomStyle } from "../../models/custom-style";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/customization";

@Injectable({
  providedIn: "root"
})
export class UploadFileService {
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

  pushFileToStorage(
    userId: number,
    formdata: FormData
  ): Observable<HttpEvent<{}>> {
    const url = `${apiUrl}/${userId}`;
    const req = new HttpRequest("PUT", url, formdata);

    return this.http.request(req).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  postCustomization(userId: number): Observable<CustomStyle> {
    const data = {
      SCZ_SU_ID: userId
    };
    return this.http
      .post<CustomStyle>(apiUrl, data, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCustomStyle(userId: number): Observable<CustomStyle> {
    const url = `${apiUrl}/${userId}`;
    return this.http.get<CustomStyle>(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
