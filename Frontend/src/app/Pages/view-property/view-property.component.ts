import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss'],
  providers: [MessageService]
})
export class ViewPropertyComponent implements OnInit {
  data:any;
  property:any
  propertyID: any;
  tenantProperty:any
  disable:boolean = false;

  constructor(
    private router:Router,
    private messageService: MessageService,
    private activeRoute:ActivatedRoute,
    private service: LandingPageService,
    private __loader: NgxUiLoaderService
  ) { }



  ngOnInit(): void {
    this.propertyID =  this.activeRoute.snapshot.params['id'] //getting the current snapshot of this route at a particular moment in time.  
    this.getPropertyByID()
  }

  // get the property details by property id
  getPropertyByID(){
    this.__loader.start();
    this.service.getPropertiesByID(this.propertyID).subscribe({
      next: (data: any) => {
        this.property = data;      
        this.data = this.property[0]  
        if (this.data.p_room > 0) {
          this.disable = false
        } else {
          this.disable = true
          this.messageService.add({
            severity:'error', summary: 'Error', detail: "Only apply to available properties", life: 6000
          });
        }      
        this.getRoomImages(this.data.property_id)
      }
    })
  }

  // getting images for the enterior part of the accomodation
  getRoomImages(userID:number){
    this.service.getRoomsImages(userID).subscribe({
      next: (data: any) => {
        this.tenantProperty = data;
        this.__loader.stop();
      }
    })
  }
}
