import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Property } from '../Interfaces/property';

@Injectable({
  providedIn: 'root'
})
export class LandlordService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }
  
  getMyProperty(id:any){
    return this.http.get(`${this.baseUrl}getproperty/${id}`)
  }
  
  postProperty(info:any, id:any){
    return this.http.post(`${this.baseUrl}add_property/${id}`, info)
  }

  deleteMyProperty(id:Property){
    return this.http.delete(`${this.baseUrl}deleteProperty/${id.property_id}`)
  }

  
}
