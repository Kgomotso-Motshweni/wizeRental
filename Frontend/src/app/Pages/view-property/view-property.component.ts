import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  data:any;
  property:any
  propertyID: any;
  tenantProperty:any

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private service: LandingPageService,
  ) { }

  ngOnInit(): void {
    this.propertyID =  this.activeRoute.snapshot.params['id']
    this.getPropertyByID()
  }

  getPropertyByID(){
    this.loading = true
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
        this.loading = false
      }
    })
  }
}
