import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';

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
  name: any
  category: any
  
  stateOptions: any;
  value1: string = "off";


  // filter vars
  condition: boolean = false;
  // name = new FormControl('');
  // category = new FormControl(''); 

  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService) { }


  // if statement for the filter button
  filter(){
    if(this.condition ==true){
      this.condition= false
    }else{
      this.condition=true
    }
   
  } 
// trying filter
  transform(value: any[], prop: string) {
    if (!Array.isArray(value) || value.length === 0 || !prop) { 
      return value;
    }
    // Here we sort the items based on passed `property`
    value.sort((a, b) => b[prop] - a[prop]);
    const max = value[0][prop];
    const min = value[value.length - 1][prop];

    return [max, min];
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
