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
  accName:any;
  price:any;
  address:any;
  rooms:any;
  bedrooms:any;

  
  // getProperty(numP: any) {

  //   console.log(this.property[numP].id)
  //   this.service.getProperty(this.property[numP].id).subscribe(
  //     (added: any) => {
  //       console.log(added[0]);
        
  //     }
  //   );

  // }



//   onClick(p: any) {
//     if(p == '20 - 30') {
//        this.service.getProperties().subscribe(property => {
//         this.property = property.filter(property => {
//           return property.p_price >= 20 && property.p_price <= 30
//         });
//         console.log('PRODUCTS RANGE 20 -30', this.property);
//       });
//     } 
//    if(p == '30 - 40') {
//     this.service.getProperties().subscribe(property => {
//       this.property = property.filter(property => {
//         return property.p_price >= 20 && property.p_price <= 30
//       });
//       console.log('PRODUCTS RANGE 30 -40', this.property);
//     });
//     } if(p == '40 - 50') {
//       this.service.getProperties().subscribe(property => {
//         this.property = property.filter(property => {
//           return property.p_price >= 20 && property.p_price <= 30
//         });
//         console.log('PRODUCTS RANGE 40 - 50', this.property);
//       });
//     } 
// }


}
