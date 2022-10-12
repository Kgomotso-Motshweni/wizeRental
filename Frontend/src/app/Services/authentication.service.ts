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
  //Gets the backend api routes 
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

  //Checks if the local storage contains access_token 
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    //return true if the is a token in the localstorage and false if not 
    return authToken !== null ? true : false;
  }
  
  //Create a logout 
  doLogout() {
    let removeToken = localStorage.clear();
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  //decodeds the token using jwt_decode
  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}
