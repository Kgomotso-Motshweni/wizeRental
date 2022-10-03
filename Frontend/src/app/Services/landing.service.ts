import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  //getting all properties
  getProperties(){
    return this.http.get(`${this.baseUrl}getproperty`);
  }

  //get property by id
  getProperty(id:any){
    console.log("from service",id)
   
    
    return this.http.get(`${this.baseUrl}getByProperty/${id}`);
    // localStorage.clear();
    // return this.http.get("http://localhost:8080/users/getByProperty/");    
  }

  // filter
  filter(){
    return this.http.get(`${this.baseUrl}filtered`);
  }
}
