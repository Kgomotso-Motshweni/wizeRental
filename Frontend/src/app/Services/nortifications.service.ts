import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NortificationsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }

  // getMyTenantesInfor(id:number){
  //   return this.http.get(`${this.baseUrl}getmyplcestens/${id}`) 
  // }

  //Landlord send Messages to specific user
  sendMessage(message:any, id:number){
    return this.http.post(`${this.baseUrl}sendMessage/${id}`, message) 
  }

  //Tenant recieve Nortifications from Landlord
  tenantReceive(id:number){
    return this.http.get(`${this.baseUrl}tenantReceive/${id}`);
  }
  
}
