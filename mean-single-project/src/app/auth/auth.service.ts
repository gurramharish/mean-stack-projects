import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACK_END_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(authData: AuthData) {
    this.http.post(`${BACK_END_URL}/signup`, authData)
    .subscribe(response => {
      this.router.navigate(['/']);
    },
    (err) => {
      this.authStatusListener.next(false);
    }
  );

  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(authData: AuthData) {
    this.http.post<{token: string, expiresIn: number, userId: string}>(`${BACK_END_URL}/login`, authData)
    .subscribe(response => {
      this.token = response.token;
      if (this.token) {
        const expireDuration = response.expiresIn;
        this.setTimer(expireDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.userId = response.userId;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expireDuration * 1000);
        this.saveAuthData(this.token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }

    }, err => {
      this.authStatusListener.next(false);
    });
  }

  getUserId() {
    return this.userId;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authData = this.getAuthData();
    const now = new Date();
    const expiresIn = authData && authData.expirationDate.getTime() - now.getTime();
    if (expiresIn && expiresIn > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.userId = authData.userId;
      this.setTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setTimer(expireDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expireDuration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
      return;
    } else {
      return {
        token,
        userId,
        expirationDate: new Date(expirationDate)
      };
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
     localStorage.setItem('token', token);
     localStorage.setItem('expiration', expirationDate.toISOString());
     localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
