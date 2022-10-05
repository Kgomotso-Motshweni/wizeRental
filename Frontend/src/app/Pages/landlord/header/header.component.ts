import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Full_Name:any = '';
  token:any = '';
  totalNumber: number = 0;
  userInfo:any = {};
  visibleSidebar2: boolean = false;

  constructor(private auth:AuthenticationService,private receive:NortificationsService,) { }

  ngOnInit(): void {
    this.loading = false;
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.transform(this.token.regData[0].firstname );
    let id = this.token.regData[0].userid ;
    
    this.receive.landlordReceive(id).subscribe({
      next:data => {
        this.userInfo = data;
        this.totalNumber = this.userInfo.length;  
      }
    })
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
