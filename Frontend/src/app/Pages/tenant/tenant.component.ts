import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { TenantsService } from 'src/app/Services/tenants.service';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  constructor(
    public auth:AuthenticationService,  
    private tenant:TenantsService ,) { }
  
  Full_Name:any = '';
  token:any = '';
  userid:any = ''
  image:any = ''
  userData: any = {};

  ngOnInit(): void {

    //Returns decoded user data from a token 
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))  
    
    //Extract only the userid of the current loggedin user 
    this.userid = this.token.regData[0].userid

    //Pass the id as an argument to the function getProfile
    this.getProfile(this.userid)
  }

  //Receives the userID as a parameter 
  getProfile(userid:any){
    const userToken = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': `${userToken}`})
    };


    this.tenant.getProfile(httpOptions, userid).subscribe({
      next:data =>{
        this.userData = data;
        this.Full_Name = this.substring(this.userData[0].firstname) +'  '+ this.substring(this.userData[0].lastname);
        this.image = this.userData[0].imageurl;
      }
    })
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
