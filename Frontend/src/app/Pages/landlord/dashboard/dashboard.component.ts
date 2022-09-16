import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
 
  rentees : any
  searchTenant : any;
  
  constructor(private dash:DashboardService) { }

  month: any = [1,3,5,7.8]
  

  ngOnInit(): void {
    this.dash.rentees().subscribe((rentee)=>{
      
      this.rentees = rentee;

      console.table(this.rentees)
    })
  }

}
