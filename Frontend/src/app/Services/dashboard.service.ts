import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http:HttpClient) { }

  baseurl:string = "http://localhost:8080/users";

  rentees()
  {
    return this.http.get(`${this.baseurl}/getRentees`)
  }

  deleteRentee(id:any)
  {
    return this.http.delete(`${this.baseurl}/deleteRentee/${id}`)
  }

}
