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
    // rentees(body:any){
    //   return this.http.post(`${this.baseUrl}getTenants`,body)
    // }
  
  //Get All The address for a specific landlord

  address(id:any){
    return this.http.get(`${this.baseUrl}getLandAddress/${id}`)
  }

  createMOA(users:any){
    return this.http.post(`${this.baseUrl}acceptNewTenant`, users)
  }
}
