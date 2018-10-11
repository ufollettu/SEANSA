import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/roles';

@Injectable({
  providedIn: 'root'
})
export class ApiResolverService implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
    // console.log('logging collected user Id:', route.params['id']);
    const id = route.params['id'];
    const url = `${apiUrl}/${id}`;
    return this.http.get(url);
  }
}
