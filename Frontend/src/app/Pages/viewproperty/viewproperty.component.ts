import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingService } from 'src/app/Services/landing.service';

@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.component.html',
  styleUrls: ['./viewproperty.component.scss']
})
export class ViewpropertyComponent implements OnInit {

 // get property by id
 accName:any;
 price:any;
 address:any;
 rooms:any;
 bedrooms:any;
 userid!: number;
 data:any;

  constructor(private serv: LandingService,private router: Router,
    private route: ActivatedRoute) { route.params.subscribe((params)=>{this.userid = params['id']})}

  ngOnInit(): void {

    console.log("from ts ",this.userid);
    this.serv.getProperty(this.userid).subscribe(
      (added: any) => {
        console.log("Data for interior",added[0]);
        this.data = added[0];
      }
    );
   
  }

  // newFunction(){
  //   this.ngOnInit();

  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //     this.router.onSameUrlNavigation = 'reload';
  //     this.router.navigate(['/view'], { relativeTo: this.route });
  //   localStorage.clear();
  // }
}



// this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//       this.router.onSameUrlNavigation = 'reload';
//       this.router.navigate(['/view'], { relativeTo: this.route });



