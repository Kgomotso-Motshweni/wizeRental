import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'; 
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


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
propertytype: any
 properties:any;
 property:any;
 searchItem:any;
 condition: boolean = false;
 tenantAddress:any;
 form!: FormGroup;
 filterItem:any;
  
  id:number = 0;
  token:any;
  totalNumber: number = 0;
  myNotification: any 
  dialogMessage: boolean = false;
  submitted: boolean = false;
  selectedValues: string[] = [];

  constructor(private notif:NortificationsService,
    private messageService: MessageService,  
    private auth:AuthenticationService,
    private router:Router,
    private formBuilder: FormBuilder,
    private service:MyroomComponent,
    private route: ActivatedRoute,) { }

    Form = new FormGroup({
      message: new FormControl(''),
      issues: new FormControl(''),
      electricity: new FormControl(''),
      address : new FormControl(''),
      propertytype : new FormControl(''),
      price : new FormControl(''),
      status : new FormControl('')
    });

    
  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid
    this.getNotifications();

    this.Form = this.formBuilder.group({
      message: ['', Validators.required],
      issues: ['', Validators.required],
      electricity: ['', Validators.required],
      address:['', Validators.required],
      propertytype: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required]
    });
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
