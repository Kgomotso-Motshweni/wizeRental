import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  constructor(
    public auth:AuthenticationService,   
  ) { }
  
  Full_Name:any = '';
  token:any = '';

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.transform(this.token.regData[0].firstname +'  '+ this.token.regData[0].lastname);
  }

  Logout(){
    this.auth.doLogout()
  }

  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }
}
