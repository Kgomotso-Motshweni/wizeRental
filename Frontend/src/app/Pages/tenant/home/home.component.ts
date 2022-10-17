import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: []
})
export class HomeComponent implements OnInit {
  tenantProperty:any
  searchItem:any;

  // filter variables
  name:any
  town:any
  accommodationType:any
  copyData:any;
  filterproperty:any;
  filtertown:any;
  filtername:any;
  townList: Array<any> = [];
  property: Array<any> = [];
  nameList: Array<any> = [];
  filteringDataList:Array<any>=[]
  price:any;
  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService) { }

  // loader and calling the getproperty function.
  ngOnInit(): void {
    this.__loader.start();
    this.getProperty();
    this.FilterTown();
    this.FilterProperty();
    this.Filtername();

  }
  
  // function that gets property
  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
          this.tenantProperty = data;
          console.log(this.tenantProperty);
          
          this.copyData = this.tenantProperty
          this.__loader.stop();
        }
      }
    )
  }

  FilterTown(){
    return this.service.getptown().subscribe({
      next: (data: any) => {
        this.filtertown = data;
        this.filtertown.forEach((element:any) => {
          this.townList.push(element.p_town)          
        });         
      }
    })
  }

  FilterProperty(){
    return this.service.getproptype().subscribe({
      next: (data: any) => {
        this.filterproperty = data;        
        this.filterproperty.forEach((element:any) => {
          this.property.push(element.p_propertytype)
        });        
      }
    })
  }
  Filtername(){
    return this.service.getpname().subscribe({
      next: (data: any) => {
        this.filtername = data;
        this.filtername.forEach((element:any) => {
          this.nameList.push(element.p_name)       
        });           
      }
    })
  }
  filterList = {
    town: this.townList,
    property_Name: this.nameList,
    property_Type: this.property,
    price_Range: ['0 - 1500', '1600 - 2500', '2600 - 5000', '5100 +']
  }; 
//put this function in your ts file.
filterChange(appliedfilters: any) 
{
  this.tenantProperty = this.copyData
  
  this.town = appliedfilters.appliedFilterValues.town
  this.name = appliedfilters.appliedFilterValues.property_Name
  this.accommodationType =  appliedfilters.appliedFilterValues.property_Type

  if(this.town){
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_town == this.town)
  }

  if(this.name){
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_name == this.name)
  }
  
  if(this.accommodationType){
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_propertytype == this.accommodationType)
  }

  if(this.price == '0 - 1500'){        
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_price <= '1500.00')
  }

  if(this.price == '1600 - 2500'){        
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_price >= '1600.00' && item.p_price <= '2500.00')
  }

  if(this.price == '2600 - 5000'){        
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_price >= '2600.00' && item.p_price <= '5000.00')
  }

  if(this.price == '5100 +'){        
    this.tenantProperty = this.tenantProperty.filter((item:any) => item.p_price >= '5100.00')
  }
}


}
