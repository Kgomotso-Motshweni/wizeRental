import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { PrimeNGConfig } from 'primeng/api';
import { Route, Router, RouterLink } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor(private auth:AuthenticationService,private primengConfig: PrimeNGConfig,  private route: Router) { }
  name: any
  totalNumber:number = 0;
  Full_Name:any = '';
  token:any = '';
  month: any = [1,3,5,7.8]

  totAmnt : number = 0;
  rentees : any
  searchTenant : any;
  
  
  ngOnInit(): void {

    //  this.primengConfig.ripple = true;
    // this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    // this.Full_Name = this.transform(this.token.regData[0].firstname +'  '+ this.token.regData[0].lastname);
    // this.totalNumber = 4;

  }

  Logout(){
    this.auth.doLogout()
  }

  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }

 
  visibleSidebar2: boolean = false;

}
