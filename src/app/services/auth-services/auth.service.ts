import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../layout-services/notification.service';
import * as jwt_decode from "jwt-decode";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const registerUrl = 'http://localhost:3000/api/auth/signup';
const loginUrl = 'http://localhost:3000/api/auth/signin';
const changePwdUrl = 'http://localhost:3000/api/auth/changepwd';
const forgotPwdUrl = 'http://localhost:3000/api/auth/forgot';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private notificatioService: NotificationService) { }

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

  isAdmin() {
    const userIdToken = jwt_decode(this.getToken());
    return userIdToken.isAdmin;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('customLogo');
    localStorage.removeItem('customStyle');

    this.router.navigate(['/login']);
  }

  forgotPassword(username) {
    return this.http.post(forgotPwdUrl, username);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  handleLoginError(err) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401 || 500) {
        this.logoutUser();
        this.notificatioService.warn('access denied, please login');
        this.router.navigate(['/login']);
      }
    }
  }

}
