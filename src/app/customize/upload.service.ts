import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('logo', file);

    const req = new HttpRequest('POST', 'http://localhost:3000/api/customization/logo', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8080/api/customization/logo');
  }
}
