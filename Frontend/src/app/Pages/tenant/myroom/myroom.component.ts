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
import { thru } from 'cypress/types/lodash';

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
  moa_data:any
  landId:any
  landlordName :any;
  moa_id: any;

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

    //get MOA, the landlord name
    this.service.getMoa(5).subscribe({next:moa =>{
     this.moa_data = moa

     
      console.table(moa)
      this.landId =this.moa_data[0].landlord_id
     
      this.service.getLandlordName(this.landId).subscribe((name)=>{
        console.log(name)
        this.landlordName = name
      })


    }})



// get the rentees (deleteee)
      this.service.getPropertyByID(this.propertyID).subscribe({
        next:data => {
          this.property = data; 
          
          console.log(this.data) 
        }
      })
//for drawing the signature
      this.canvas = new fabric.Canvas('canvas',{
        isDrawingMode:true
      })

  }
// saving the id (to the signature column)
  save(id:any){

    this.moa_id = id;
    console.log("my id",this.moa_id)
     const base64 = this.canvas.toDataURL('image/png',0.5);
     console.log("testing",base64);

      const moaData ={
        moa:this.moa_id,
        signature:base64
      }

      console.log(moaData)

     }

  drawClear(){
    this.canvas.clear();
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
  
 



