import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

export interface AuthApiResponse {
  token: string
}

export interface AuthCredentials {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string|null {
    return window.localStorage.getItem("token") || null
  }

  isAuthenticated():boolean {
    return this.getToken() !== null;
  }

  authenticate(credentials: AuthCredentials): Observable<string> {
    return this.http.post<AuthApiResponse>("http://localhost:3000/api/login_check", credentials).pipe(
      map((result) => result.token),
      tap((token) => window.localStorage.setItem("token", token))
    );
  }

  logout():void {
    window.localStorage.removeItem('token');
  }

}
