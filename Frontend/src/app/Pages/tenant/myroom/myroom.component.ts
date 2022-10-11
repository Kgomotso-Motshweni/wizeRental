import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { TenantsService } from 'src/app/Services/tenants.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-myroom',
  templateUrl: './myroom.component.html',
  styleUrls: ['./myroom.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class MyroomComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  visibleSidebar2: boolean = false;

 name:any = "search";
 propertytype: any;
 properties:any;
 property:any;
 searchItem:any;

 tenantProperty:any

 
 
 condition: boolean = false;
 tenantAddress:any;
 form!: FormGroup;
 filterItem:any;
 getRoomImages:any;
 emptyRoom: number = 1;
  id:number = 0;
  token:any;
  totalNumber: number = 0;
  myNotification: any 
  dialogMessage: boolean = false;
  submitted: boolean = false;
  data:any;
  // property:any;
  propertyID: any;
  selectedValues: string[] = [];
  // private __loader: any;
  constructor(private notif:NortificationsService,
    private messageService: MessageService,  
    private auth:AuthenticationService,
    private service:TenantsService,
    private router:Router,
    private formBuilder: FormBuilder,
    private services:LandingPageService,
    private activeRoute:ActivatedRoute,
    private __loader: NgxUiLoaderService,
    
  ) { }

    Form = new FormGroup({
      message: new FormControl(''),
      issues: new FormControl(''),
      electricity: new FormControl(''),
      accName: new FormControl(''),
      address: new FormControl(''),
      rooms: new FormControl(''),
      propertyType: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl('')
    
    });

    
  ngOnInit(): void {
    this.__loader.start();
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid
    this.getNotifications();
    // this.getProperty();
    // this.getDetails();



    // this.notif.tenantReceive(this.id).subscribe({
    //   next:data => {
    //     this.myNotification = data
    //     this.totalNumber = this.myNotification.length
    //   }
    // })




 

    this.Form = this.formBuilder.group({
      message: ['', Validators.required],
      issues: ['', Validators.required],
      electricity: ['', Validators.required],
      // address:['', Validators.required],
      // propertytype: ['', Validators.required],
      // price: ['', Validators.required],
      // status: ['', Validators.required]
    });

// get the rentees
      this.service.getPropertyByID(this.propertyID).subscribe({
        next:data => {
          this.property = data;
          console.log("rentees",this.data) 
        }
      })
    
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  getNotifications(){
    return this.notif.tenantReceive(this.id).subscribe({
      next:data => {
        this.myNotification = data
        this.totalNumber = this.myNotification.length
        this.__loader.stop();
      }
    })
  }

    // function that gets property
    // getProperty(){
    //   this.service.getProperties().subscribe({
    //     next: (data: any) => {
    //         this.tenantProperty = data;
    //         this.__loader.stop();
    //       }
    //     }
    //   )
    // }

  // getDetails(){
  //   return this.service.tenantReceive(this.id).({
  //     next:(data: number) => {
  //       this.emptyRoom = data
  //       this.totalNumber = this.emptyRoom
  //       this.__loader.stop();
  //     }
  //   })
  // }


   //Open a modal for log issues
   logIssues(){
    this.submitted = false;
    this.dialogMessage = true;
  }

  hideDialog(){
    this.submitted = false;
    this.dialogMessage = false;
  }

  sendNotification(){
    this.submitted = true;
    this.__loader.start();
    console.log(this.Form.value.message)
    console.log(this.Form.value.issues)
    console.log(this.Form.value.electricity)

    this.__loader.stop();
  }


}
  
 



