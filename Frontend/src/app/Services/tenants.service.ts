import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TenantsService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }

  //Tenants Apply for new accommodation
  ApplyProperty(info:any, id:any){
    return this.http.post(`${this.baseUrl}application/${id}`, info)
  }

  //Gets user propfile 
  getProfile(accessToken:any,id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}profile/${id}`, accessToken )
  }

  //Update user information
  updateProfile(user:any, id:any){
    return this.http.patch(`${this.baseUrl}update/${id}`, user)
  }

  getMoa(id:any){
    return this.http.get(`${this.baseUrl}getMOA/${id}`)
  }

  updateSignature(body:any){
    return this.http.post(`${this.baseUrl}updateSignature`,body)
  }


  getLandlordName(id:any){
    return this.http.get(`${this.baseUrl}getLandlordName/${id}`)
  }


  getPropertyByID(id:any)
  {
    return this.http.get("http://localhost:8080/api/getPropertyByID/1")
  }

}
