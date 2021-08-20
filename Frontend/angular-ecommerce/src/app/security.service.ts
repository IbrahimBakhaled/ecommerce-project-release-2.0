import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authorizeEndpoint = '/oauth2/authorization/github';
  private tokenEndpoint = '/login/oauth2/code/github';
  private baseUrl = environment.baseUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }


  login(){
    window.open(this.baseUrl + this.authorizeEndpoint,'_self');
  }

  updateToken(token){
    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code, state) : Observable<any>{
    return this.http.get(this.baseUrl + this.tokenEndpoint + '?code=' + code + '&state=' + state);
  }


<<<<<<< HEAD
  getToken(){
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(){
    const token = this.getToken();
    return token != null;
  }
=======
getToken(){
    return localStorage.getItem(this.tokenKey);
}

isLoggedIn(){
    const token = this.getToken();
    return token != null;
}
>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
}

