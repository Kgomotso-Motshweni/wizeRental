import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http:HttpClient) { }
  baseUrl = environment.baseUrl; 


  
  deleteRentee(id:any){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  }

  updatePayment(body:any){
    return this.http.put(`${this.baseUrl}updatePayment`,body)
  }

}
