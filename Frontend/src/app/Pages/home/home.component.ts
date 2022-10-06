import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

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


  // filter vars
  condition: boolean = false;
  // name = new FormControl('');
  // category = new FormControl(''); 

  constructor(private service: LandingPageService,) { }


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
    this.loading =true
    this.getProperty();
  }
  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
          this.tenantProperty = data;
        }
      })
  }
}
