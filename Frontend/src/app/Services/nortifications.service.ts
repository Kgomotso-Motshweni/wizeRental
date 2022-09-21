import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NortificationsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private router: Router) { }

  getMyTenantesInfor(id:number){
    return this.http.get(`${this.baseUrl}getmyplcestens/${id}`) 
  }
}
