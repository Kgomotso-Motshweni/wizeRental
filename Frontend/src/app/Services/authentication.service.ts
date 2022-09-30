import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../Interfaces/login';
import jwt_decode from 'jwt-decode';

const userToken = localStorage.getItem('access_token');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': `${userToken}`})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  getProfile(httpOptions: { headers: HttpHeaders; }, userid: any) {
    throw new Error('Method not implemented.');
  }
  fullname: any;
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }
  
  //create a login request using 
  login(users : Login):Observable<any> {
    return this.http.post(`${this.baseUrl}login`, users)
  }

  //create a register request 
  register(users : any, user_role:any):Observable<any>{
    return this.http.post(`${this.baseUrl}register/${user_role}`, users)
  }

  //create a login request 
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  
  //Create a logout 
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  //create a get request for current logged in user
  //pass the token back to the backend to be decoded in order to receive current logged in user
}
