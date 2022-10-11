import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  name:any
  town:any
  accommodationType:any
  searchItem:any;
  tenantProperty:any;
  copyData:any;
  filterproperty:any;
  filtertown:any;
  filtername:any;
  townList: Array<any> = [];
  property: Array<any> = [];
  nameList: Array<any> = [];
  filteringDataList:Array<any>=[]
  constructor(private service: LandingPageService, private __loader: NgxUiLoaderService) { }


  // function for getting all the properties 
  ngOnInit(): void {
    this.__loader.start();
    this.getProperty();
    this.FilterTown();
    this.FilterProperty()
    this.Filtername()
  }

  FilterTown(){
    return this.service.getFilterDataTown().subscribe({
      next: (data: any) => {
        this.filtertown = data;
        this.filtertown.forEach((element:any) => {
          this.townList.push(element.p_town)          
        });         
      }
    })
  }

  FilterProperty(){
    return this.service.getFilterDataProperty().subscribe({
      next: (data: any) => {
        this.filterproperty = data;        
        this.filterproperty.forEach((element:any) => {
          this.property.push(element.p_propertytype)
        });        
      }
    })
  }

  Filtername(){
    return this.service.getFilterDataName().subscribe({
      next: (data: any) => {
        this.filtername = data;
        this.filtername.forEach((element:any) => {
          this.nameList.push(element.p_name)       
        });           
      }
    })
  }
 
  getProperty(){
    this.service.getProperties().subscribe({
      next: (data: any) => {
        this.tenantProperty = data;
        //Making a duplicate
        this.copyData = this.tenantProperty
        this.__loader.stop();
      }
    })
  }
  
  filterList = {
    town: this.townList,
    property_Name: this.nameList,
    property_Type: this.property
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
  }
}
