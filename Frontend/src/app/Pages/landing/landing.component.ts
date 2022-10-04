import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  
  name:any = "search";
  propertytype: any
 properties:any;
 property:any;
 searchItem:any;
 condition: boolean = false;
 tenantAddress:any;
 form!: FormGroup;
 filterItem:any;


//  private serv:LandingService
  constructor(private service:LandingPageService,private router: Router,private route: ActivatedRoute, private auth:AuthenticationService) { }


 
  ngOnInit(): void {
    
    this.form= new FormGroup({
      accName: new FormControl(''),
      bathrooms: new FormControl(''),
      address: new FormControl(''),
      rooms: new FormControl(''),
    });

   
    const propertyType = {
      no1:"Commune",
      no2:"Studio",
      no3:"Backroom"
    }
    this.propertytype = propertyType;

  //  console.log(no1);

    this.service.getProperties().subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.property = data;
        }
      })

  }
  filter(){
    if(this.condition ==true){
      this.condition= false
    }else{
      this.condition=true
    }
   
  }
  // get details of the room
  accName:any;
  price:any;
  address:any;
  rooms:any;
  bedrooms:any;
  id:any;

  
  

  filterby(){
  
  }



onClick(ind:any){
  this.service.getProperties().subscribe(
    {
      next: (data: any) => {
        // console.log(data[ind]);
        // this.id =data[ind].property_id;

        this.id = this.property[ind].property_id
        localStorage.setItem('prop_id',this.id);
        localStorage.setItem('data',data);

        const userid=localStorage.getItem('prop_id');

        console.log("From landing",userid);
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/view'], { relativeTo: this.route });

}


// try filter

// getLandLordAddress(){
   
//   return this.property.p_type(1).subscribe({
//     next:(data:any) => {
//       this.tenantAddress = data
//     }
//   })

// }


// try
//  transform(list: any[], value: [], key: []): any {
//   value.forEach((data, index) => {
//     if (data) {
//       list = list.filter((item) => {
//         return (item[key[index]]
//           .toString()
//           .toLowerCase()
//           .indexOf(data) !== -1)
//       });
//     }
//   });
//   return list;
// }



}
function no1(no1: any) {
  throw new Error('Function not implemented.');
}

