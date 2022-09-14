import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { LandingService } from 'src/app/Services/landing.service';
import { TenantService } from 'src/app/Services/tenant.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
 properties:any;
 property:any;
 searchItem:any;

 form!: FormGroup;

//  private serv:LandingService
  constructor(private service:LandingService) { }

  ngOnInit(): void {
    
    this.form= new FormGroup({
      accName: new FormControl(''),
      bathrooms: new FormControl(''),
      address: new FormControl(''),
      rooms: new FormControl(''),
    });

    this.service.getProperties().subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.property = data;
        }
      })



  }

  // get details of the room

  // getProperty(numP: any) {

  //   console.log(this.property[numP].id)
  //   this.serv.getProperty(this.property[numP].id).subscribe(
  //     (added: any) => {
  //       console.log(added[0]);
        
  //     }
  //   );

  // }


}
