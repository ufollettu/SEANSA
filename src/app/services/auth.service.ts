import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const registerUrl = 'http://localhost:3000/api/auth/signup';
const loginUrl = 'http://localhost:3000/api/auth/signin';
const changePwdUrl = 'http://localhost:3000/api/auth/changepwd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user) {
    return this.http.post(registerUrl, user);
  }

  changePwd(user) {
    return this.http.put(changePwdUrl, user);
  }

  loginUser(user) {
    return this.http.post(loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('customLogo');
    localStorage.removeItem('customStyle');

    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
