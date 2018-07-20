import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const registerUrl = '/api/auth/signup';
const loginUrl = '/api/auth/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(registerUrl, user);
  }

  loginUser(user) {
    return this.http.post(loginUrl, user);
  }
}
