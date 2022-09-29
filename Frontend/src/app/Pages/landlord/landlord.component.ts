import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';

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

  constructor(private auth:AuthenticationService) { }
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

  visibleSidebar2: boolean = false;

}
