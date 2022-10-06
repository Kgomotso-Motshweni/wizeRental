import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchItem:any;
  tenantProperty:any
  
  // filter vars
  condition: boolean = false;

  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService) { }


  // if statement for the filter button
  filter(){
    if(this.condition ==true){
      this.condition= false
    }else{
      this.condition=true
    }
   
  } 

  // function for getting all the properties 
  ngOnInit(): void {
    this.__loader.start();
    this.getProperty();
  }
  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
          this.tenantProperty = data;
          this.__loader.stop();
        }
      })
  }
}
