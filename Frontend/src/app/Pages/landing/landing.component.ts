import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { LandingService } from 'src/app/Services/landing.service';
import { TenantService } from 'src/app/Services/tenant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  // LoginStatus$ = new BehaviorSubject<boolean>(null);
  // username$ :Observable<string>;

 properties:any;
 property:any;
 searchItem:any;
 condition: boolean = false;
 form!: FormGroup;

//  private serv:LandingService
  constructor(private service:LandingService,private router: Router,private route: ActivatedRoute, private auth:AuthenticationService) { }

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
  filter(){
    this.condition = true
  }
  // get details of the room
  accName:any;
  price:any;
  address:any;
  rooms:any;
  bedrooms:any;
  id:any;

  
  // getProperty(numP: any) {

  //   console.log(this.property[numP].id)
  //   this.service.getProperty(this.property[numP].id).subscribe(
  //     (added: any) => {
  //       console.log(added[0]);
        
  //     }
  //   );

  // }



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


}
