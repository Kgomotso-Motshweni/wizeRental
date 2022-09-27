import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  constructor(private http:HttpClient) { }
  baseUrl = environment.baseUrl; 

  //delete tenants
  deleteRentee(id:any){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  }

  //toggle update
  updatePayment(body:any){
    return this.http.put(`${this.baseUrl}updatePayment`,body)
  }

  //Get All The rentees from that specific address
   rentees(address:any){
    return this.http.get(`${this.baseUrl}getTenants/${address}`)
  }
   
  //Get All The address for a specific landlord

  address(id:any){
    return this.http.get(`${this.baseUrl}getLandAddress/${id}`)
  }
  
}
