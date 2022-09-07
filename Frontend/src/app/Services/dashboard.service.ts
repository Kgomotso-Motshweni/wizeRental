import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http:HttpClient) { }

  rentees()
  {
    return this.http.get('http://localhost:8080/users/getRentees')
  }

}
