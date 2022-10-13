import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { TenantsService } from 'src/app/Services/tenants.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import{ fabric } from 'fabric';
import { LandingPageService } from 'src/app/Services/landing-page.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-myroom',
  templateUrl: './myroom.component.html',
  styleUrls: ['./myroom.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class MyroomComponent implements OnInit {
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
 emptyRoom: number = 0;
 
  id:number = 0;
  token:any;
  totalNumber: number = 0;
  myNotification: any 
  dialogMessage: boolean = false;
  SignMOA:boolean = false;
  visibleSidebar2:boolean = false
  submitted: boolean = false;
  mymoa:any;
  data:any;
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
    private formBuilder: FormBuilder,
    private services:LandingPageService,
    private activeRoute:ActivatedRoute,
    private __loader: NgxUiLoaderService,
    
  ) { }

    Form = new FormGroup({
      message: new FormControl(''),
      issues: new FormControl(''),
      moa: new FormControl(''),
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
    this.getMoaData();

    this.Form = this.formBuilder.group({
      issues: ['', Validators.required],
      message: ['', Validators.required],
      electricity: ['', Validators.required],
      // address:['', Validators.required],
      // propertytype: ['', Validators.required],
      // price: ['', Validators.required],
      // status: ['', Validators.required]
    });

 
    //for drawing the signature
    this.canvas = new fabric.Canvas('canvas',{
      isDrawingMode:true
    })
  }

  onCheckboxChange(e:any){
    let loged = e.target.value;
    if (e.target.checked) {
      this.selectedValues.push(loged)
    }else{
      const index = this.selectedValues.indexOf(loged) 
      this.selectedValues.splice(index,1)
    }
    
  }

  //Get Moa Details
  getMoaData(){
    this.service.getMoa(this.id).subscribe({
      next:data => {
        this.mymoa = data  
        this.mymoa = this.mymoa[0]
        this.__loader.stop();    
      }
    })
  }

  sign(){
    this.SignMOA = true;
  }

  hidesign(){
    this.SignMOA = false;
  }

  // saving the id (to the signature column)
  save(id:any){
    this.__loader.start();
    this.moa_id = id;
    const base64 = this.canvas.toDataURL('image/png',0.5);
    const moaData ={
      moa:this.moa_id,
      signature:base64,
      id:this.id 
    }
    
    this.service.updateSignature(moaData).subscribe({
      next:data => {
        this.SignMOA = false;
        this.__loader.stop();
        this.messageService.add({
          severity:'success', summary: 'Success', detail: "Moa Signed", life: 3000
        });
       
      },
      error:err=>{
        this.__loader.stop();
        this.messageService.add({
           severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });
      }
    })
  }

  drawClear(){
    this.canvas.clear();
  }
// get the rentees
      // this.service.getPropertyByID(this.propertyID).subscribe({
      //   next:data => {
      //     this.property = data;
      //     this.emptyRoom = this.property.length
      //     console.log(data) 
      //   }
      // 
      
      
      
  getMyRoom(){
    this.service.getRoom(this.id).subscribe({
      next: (data: any) => {
        this.property = data;
        this.emptyRoom = this.property.length
        this.__loader.stop();
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
        console.log(data);
        this.totalNumber = this.myNotification.length      
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
    console.log(this.id);
    console.log(this.Form.value.message)
    console.log(this.selectedValues)


    this.__loader.stop();
  }
}
  
 



