import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Property } from '../Interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  //Gets my 
  getMyProperty(id:any){
    return this.http.get(`${this.baseUrl}getproperty/${id}`)
  }
  
  //Post Property Details
  postProperty(info:any, id:any){
    return this.http.post(`${this.baseUrl}add_property/${id}`, info)
  }

  //Post Property Rooms used for gallery
  AddRooms(proRooms:any, id:any){
    return this.http.post(`${this.baseUrl}add_rooms/${id}`, proRooms)
  }

  //Delete Property 
  deleteMyProperty(id:Property){
    return this.http.delete(`${this.baseUrl}deleteProperty/${id.property_id}`)
  }

  //Delete Rentees 
  deleteRentee(id:any){
    return this.http.delete(`${this.baseUrl}deleteRentee/${id.rentee_id}`)
  }

  updatePayment(body:any){
    return this.http.put(`${this.baseUrl}updatePayment`,body)
  }

  //Get All The rentees from that specific address
   rentees(users:any){
    return this.http.post(`${this.baseUrl}getTenants`,users)
  }

  //Get All The Accommodations names for a specific landlord
  address(id:any){
    return this.http.get(`${this.baseUrl}getLandAddress/${id}`)
  }

  //Creates MOA
  createMOA(users:any){
    return this.http.post(`${this.baseUrl}acceptNewTenant`, users)
  }

  //Reject Tenant
  reject(users:any){
    return this.http.post(`${this.baseUrl}rejetctNewTenant`, users)
  }


  UpdateRooms(user:any, id:any){
    return this.http.patch(`${this.baseUrl}updateRooms/${id}`, user);
  }

  getRoomsNumber(totalRooms:number){
  
  }
}
