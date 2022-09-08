import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor( private auth:AuthenticationService,) { }
  name: any
  totalNumber:number = 0;
  Full_Name:any = '';
  token:any = '';

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.transform(this.token.regData[0].firstname +'  '+ this.token.regData[0].lastname);
    this.totalNumber = 4;
  }

  Logout(){
    this.auth.doLogout()
  }

  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }
}
