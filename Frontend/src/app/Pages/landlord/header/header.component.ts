import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Full_Name:any = '';
  token:any = '';
  totalNumber: number = 0;
  totNumTenants: any = {};
  constructor(private auth:AuthenticationService,private dash: DashboardService) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.transform(this.token.regData[0].firstname );
    //Pending Tenants

    this.dash.getPendTenants(1).subscribe({
      next:data  => {
        this.totNumTenants = data;
        this.totalNumber = this.totNumTenants.length;
        }
      }
    )
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
  visibleSidebar2: boolean = false;
}
