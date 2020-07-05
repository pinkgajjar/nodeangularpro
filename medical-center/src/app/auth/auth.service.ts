import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable()
export class AuthService {
constructor(private http: HttpClient) { }

//save the token in localstorage

  public getToken(): string {
    return localStorage.getItem('tokenstore');
  }

}