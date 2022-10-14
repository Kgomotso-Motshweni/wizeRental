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
import jspdf  from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-myroom',
  templateUrl: './myroom.component.html',
  styleUrls: ['./myroom.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class MyroomComponent implements OnInit {

  property:any;
  emptyRoom: number = 0;
  id:number = 0;
  token:any;
  totalNumber: number = 0;
  myNotification: any 
  dialogMessage: boolean = false;
  SignMOA:boolean = false;
  visibleSidebar2:boolean = false;
  submitted: boolean = false;
  mymoa:any;
  canvas:any;
  landId:number = 0;
  moa_id: any;
  signed:any;
  messages:any;
  condition:any;
  download: boolean = false;

  constructor(private notif:NortificationsService,
    private messageService: MessageService,  
    private auth:AuthenticationService,
    private notification:NortificationsService,
    private service:TenantsService,
    private formBuilder: FormBuilder,
    private __loader: NgxUiLoaderService,
    private router:Router,
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
    });

 
    //for drawing the signature
    this.canvas = new fabric.Canvas('canvas',{
      isDrawingMode:true
    })
    this.getMyRoom();
  }
  
  getMyRoom(){
    this.service.getRoom(this.id).subscribe({
      next: (data: any) => {
        this.property = data;
        this.signed = this.property[0].moa_status
        console.log(data);
        
        if(this.property[0].status == 'accepted'){
          this.condition = 'accepted'
        }else if(this.property[0].status == 'pending'){
          this.condition = 'pending'
        }else {
          this.condition = 'rejected'
        }
        this.landId = this.property[0].landlord_id
        this.emptyRoom = this.property.length
        this.__loader.stop();
      },
      error: err => {
        this.condition = 'rejected';
      }
    })
  }
  

  //Get Moa Details
  getMoaData(){
    this.service.getMoa(this.id).subscribe({
      next:data => {
        this.mymoa = data 
        console.log(data);
         
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
        this.messages = data
        this.__loader.stop();
        this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
        this.router.onSameUrlNavigation = "reload";
        this.messageService.add({
          severity:'success', summary: 'Success', detail: this.messages.message, life: 3000
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

  //Clear signature without submitting
  drawClear(){
    this.canvas.clear();
  }
        
 
  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  //get Length Size of the Notifications
  getNotifications(){
    return this.notif.tenantReceive(this.id).subscribe({
      next:data => {
        this.myNotification = data
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
    if (!this.Form.value.issues || !this.Form.value.message) {
      console.log("inputs needed");
      
      return
    }

    let info ={
      nortType: this.Form.value.issues,
      recipient: this.landId,
      message: this.Form.value.message,
    }
    console.log(info);
    
    this.notification.tenantSend(info, this.id).subscribe({
      next:data => {
        this.messages = data;
        this.dialogMessage = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail:  this.messages.message, life: 3000});
      },
      error: err => {
        this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000});
      }
    })
    this.__loader.stop();
  }

  //Download MOA
  public captureScreen() {
    this.download =true
    var data = document.getElementById("contentToConvert");
    html2canvas(data!, {
      useCORS: true,
      // foreignObjectRendering: true,
      allowTaint: true
      }).then(canvas => {
      // Few necessary setting options
      var fileWidth = 180;
      var fileHeight = (canvas.height * fileWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL("image/png");

      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 10;
      pdf.addImage(contentDataURL, "PNG", 10, position, fileWidth, fileHeight);
      pdf.save("Lease Agreement.pdf"); // Generated PDF
    });
  }
}
  
 



