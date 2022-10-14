import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProperties(){
    return this.http.get(`${this.baseUrl}getproperty`)
  }

  getPropertiesByID(id:any){
    return this.http.get(`${this.baseUrl}getByProperty/${id}`)
  }

  getRoomsImages(id:any){
    return this.http.get(`${this.baseUrl}getRoomsImages/${id}`)
  }

}