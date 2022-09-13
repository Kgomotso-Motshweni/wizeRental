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
  userid:any = ''
  image:any = ''
  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.substring(this.token.regData[0].firstname) +'  '+ this.substring(this.token.regData[0].lastname);
    this.image = this.token.regData[0].imageurl;
    this.userid = this.token.regData[0].userid
  }

  Logout(){
    this.auth.doLogout()
  }

 //Receive an entire string, take the first letter and transform it into uppercase 
  substring(value:any): string{
    let letter = this.transform(value.substring(0,1)) + value.substring(1); 
    return letter
  }

  //Transform Strings to uppercase letter
  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }
}
