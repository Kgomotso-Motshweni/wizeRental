import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterList = {
    country : ['India', 'USA', 'Japan', 'Australia'],
    sector: ['IT', 'Agriculture', 'Medical']
    //here you can add as many filters as you want.
    };  

    //put this function in your ts file.
  filterChange(appliedfilters: any) {
    console.log(appliedfilters);
    /*let you have selected India as country and IT sector.

    you will get an object here i.e.

   { appliedFilterValues: {country: "India",sector: "IT"}
   isFilter: true
   }
    */
    
    //now do your awesome filtering work here.
}
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
