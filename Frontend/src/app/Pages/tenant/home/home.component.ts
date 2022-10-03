import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LandingComponent } from '../../landing/landing.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LandingService } from 'src/app/Services/landing.service';
import { HttpHeaders } from '@angular/common/http';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  properties:any;
  
  searchItem:any;
  condition: boolean = false;
  // form!: FormGroup;
  file: any = '';
  constructor(private auth:AuthenticationService,private service:LandingService,private route:ActivatedRoute,private router:Router ) { }
  Full_Name:any = '';
  token:any = '';
  userid:any = ''
  image:any = ''
  userData: any = {};
  id:any;
  tenantProperty:any;


  // selectThisImage(myEvent: any) {
  //   this.file = myEvent.target.files[0];
  // }
  ngOnInit(): void {
    // this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    // this.userid = this.token.regData[0].userid
    // this.getProfile(this.userid)

    this.service.getProperties().subscribe(
      {
        next: (data: any) => {
          console.log(data);
          this.tenantProperty = data;
        }
      })
  }

  filter(){
    this.condition = true
  }

  onClick(ind:any){
    this.service.getProperties().subscribe(
      {
        next: (data: any) => {
          console.log(data[ind]);
          this.id =data[ind].property_id;
  
          this.id = this.tenantProperty[ind].property_id
          localStorage.setItem('prop_id',this.id);
          localStorage.setItem('data',data);
  
          const userid=localStorage.getItem('prop_id');
  
          console.log("From tenant home",userid);
        }
      });
  
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/view'], { relativeTo: this.route });
  
  }

}
