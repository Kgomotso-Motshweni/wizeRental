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
   tenants(address:any){
    return this.http.get(`${this.baseUrl}getTenants/${address}`)
  }
  
  rentees(id:any){
    return this.http.get(`${this.baseUrl}getRentees/${id}`)
  }

  getPendTenants(id:any){
    return this.http.get(`${this.baseUrl}/getPending/${id}`)
  }

  deleteRentee(id:Payment){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  } 

  getProperties(id:any){
    return this.http.get(`${this.baseUrl}getproperties/${id}`)
  }

  updateRoom(newRoom:any, property_id:number){
    return this.http.patch(`${this.baseUrl}increaseRooms/${property_id}`,newRoom)
  }
}
