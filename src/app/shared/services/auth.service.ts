import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  constructor(private router:Router,private _location: Location) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email,password) {

    if(email && password) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.saveAuthData();
      this._location.back();
    } else {
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
    }

  }

  private saveAuthData() {
    localStorage.setItem("loggedIn", 'true');
  }

  private clearAuthData() {
    localStorage.removeItem("loggedIn");
  }


  private getAuthData() {
    const loggedIn = localStorage.getItem("loggedIn");
    return loggedIn;
  }

  autoAuthUser() {
    const loggedIn = this.getAuthData();
    if(loggedIn == 'true') {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    } else {
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this._location.back();
  }
}
