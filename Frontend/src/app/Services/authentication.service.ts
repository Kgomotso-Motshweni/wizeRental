import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../Interfaces/login';
import { Register } from '../Interfaces/register';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userToken: any;
  role: any;
  myData: any = {};
  userinfor: any = {};
  OneUserInfor: any = {};
  fullname: any;
  errorMessage = '';

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }
  

  //create a login request using 
  login(users : Login) {
    this.http.post(`${this.baseUrl}login`, users).subscribe({
      next:data => {
        this.myData = data;

        this.userToken = this.myData.token;

        localStorage.setItem('access_token', this.userToken);

        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': `${this.userToken}` })
        };

        this.http.get(`${this.baseUrl}profile`,httpOptions).subscribe({
          next:data => {
            this.userinfor = data;
            this.OneUserInfor = this.userinfor.decoded.regData[0].user_role;
            this.fullname = this.userinfor.decoded.regData[0].firstname + this.userinfor.decoded.regData[0].lastname;
            console.log(this.fullname)
          }
        })

        if(this.OneUserInfor == 'Landlord'){
          this.router.navigate(['/landlord/dash'])
        }else{
          this.router.navigate(['/landlord/dash'])
        }
      }
    })
  }

  //create a register request 
  register(users : Register):Observable<any>{
    return this.http.post(`${this.baseUrl}register`, users)
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

  //create a get request for current logged in user
  //pass the token back to the backend to be decoded in order to receive current logged in user
}
