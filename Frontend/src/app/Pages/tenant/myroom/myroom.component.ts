import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { TenantsService } from 'src/app/Services/tenants.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{fabric} from 'fabric';

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
  
  id:number = 0;
  token:any;
  totalNumber: number = 0;
  myNotification: any 
  dialogMessage: boolean = false;
  submitted: boolean = false;
  mymoa:any;
  data:any;
  property:any;
  propertyID: any;
  selectedValues: string[] = [];
  canvas:any;
  

  constructor(private notif:NortificationsService,
    private messageService: MessageService,  
    private auth:AuthenticationService,
    private service:TenantsService,
    private router:Router,
    private formBuilder: FormBuilder,) { }

    Form = new FormGroup({
      message: new FormControl(''),
      issues: new FormControl(''),
      moa: new FormControl(''),
      electricity: new FormControl('')

    });

    
  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid
    this.getNotifications();

    this.Form = this.formBuilder.group({
      message: ['', Validators.required],
      issues: ['', Validators.required],
      electricity: ['', Validators.required],
    });

// get the rentees
      this.service.getPropertyByID(this.propertyID).subscribe({
        next:data => {
          this.property = data; 
          console.log(this.data) 
        }
      })

      this.canvas = new fabric.Canvas('canvas',{
        isDrawingMode:true
      })

  }

// canvas 
// canvas1 = new fabric.Canvas("canvasClass");
  // save(){
  //   window.open(this.canvas1.toDataURL( 'jpeg'));
  //   console.log("This is the image URL",this.canvas1)
  //  }

  save(){
     const base64 = this.canvas.toDataURL('image/png',0.5);
     console.log("testing",base64);
     }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  getNotifications(){
    return this.notif.tenantReceive(this.id).subscribe({
      next:data => {
        this.myNotification = data
        this.totalNumber = this.myNotification.length
      }
    })
  }

  getNewTenant(){
    return this.service.getMoa(this.id).subscribe({
      next:data => {
        this.mymoa = data
        console.log(this.data)
      }
    })
  }

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
    console.log(this.Form.value.message)
    console.log(this.Form.value.issues)
    console.log(this.Form.value.electricity)
  }

}
  
 



