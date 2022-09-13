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
    return this.http.get(`${this.baseUrl}` + '/property');
  }

  //get property by id
  getProperty(id: any){
    return this.http.get(`${this.baseUrl}/getProp/${id}`,{responseType: 'json'});
  }

}
