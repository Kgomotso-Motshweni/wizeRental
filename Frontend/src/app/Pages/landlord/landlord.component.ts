import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
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
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

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
    this.loading = true;
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
