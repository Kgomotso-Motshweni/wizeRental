import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Payment } from '../Interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }

  //Get All The address for a specific landlord
  address(id:any){
    return this.http.get(`${this.baseUrl}getLandAddress/${id}`)
  }

  //Get All The rentees from that specific address
  rentees(address:any){
    return this.http.get(`${this.baseUrl}getRentees/${address}`)
  }
  
  //Get Pending Tenants
  getPendTenants(id:number){
    return this.http.get(`${this.baseUrl}getPending/${id}`)
  }
  
  //Get One Pending Tenant
  getOnePendTenants(id:any){
    return this.http.get(`${this.baseUrl}getOnePending/${id}`)
  }
  
  deleteRentee(id:Payment){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  }
  paymentStatus(){
    return this.http.get(`${this.baseUrl}getPayment`)
  }  

  getProperties(id:any){
    return this.http.get(`${this.baseUrl}getproperties/${id}`)
  }


}
