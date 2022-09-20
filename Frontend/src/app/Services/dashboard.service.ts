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

  rentees(){
    return this.http.get(`${this.baseUrl}getRentees`)
  }
  
  deleteRentee(id:Payment){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  }
  paymentStatus(){
    return this.http.get(`${this.baseUrl}getPayment`)
  }  
}
