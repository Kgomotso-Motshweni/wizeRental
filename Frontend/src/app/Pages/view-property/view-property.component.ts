import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  data:any;
  property:any
  propertyID: any;
  tenantProperty:any

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private service: LandingPageService,
    private __loader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.propertyID =  this.activeRoute.snapshot.params['id']
    this.getPropertyByID()
  }

  getPropertyByID(){
    this.__loader.start();
    this.service.getPropertiesByID(this.propertyID).subscribe({
      next: (data: any) => {
        this.property = data;
        this.data = this.property[0]        
        this.getRoomImages(this.data.property_id)
      }
    })
  }

  getRoomImages(userID:number){
    this.service.getRoomsImages(userID).subscribe({
      next: (data: any) => {
        this.tenantProperty = data;
        this.__loader.stop();
      }
    })
  }
}
