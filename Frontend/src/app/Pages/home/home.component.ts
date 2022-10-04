import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  searchItem:any;
  tenantProperty:any

  constructor(private service: LandingPageService,) { }

  filter(){

  } 
  ngOnInit(): void {
    this.loading =true
   this.getProperty();
  }
  getProperty(){
    this.loading = true
    this.service.getProperties().subscribe({
      next: (data: any) => {
        this.loading = true
          this.tenantProperty = data;
          this.loading = false
          console.log(data)
        }
      })
  }
}
