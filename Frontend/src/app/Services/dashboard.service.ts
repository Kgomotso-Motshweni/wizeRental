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


  rentees(id:any){
    return this.http.get(`${this.baseUrl}getRentees/${id}`)
  }

  getPendTenants(id:any){
    return this.http.get(`${this.baseUrl}/getPending/${1}`)
  }

  deleteRentee(id:any){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id}`)
  }

  // paymentStatus(){
  //   return this.http.get(`${this.baseUrl}getPayment`)
  // }  

  getProperties(id:any){
    return this.http.get(`${this.baseUrl}getproperties/${id}`)
  }




}
