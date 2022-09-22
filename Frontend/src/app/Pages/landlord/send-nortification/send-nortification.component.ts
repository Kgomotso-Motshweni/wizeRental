import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { SelectItem, PrimeNGConfig } from "primeng/api";
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-send-nortification',
  templateUrl: './send-nortification.component.html',
  styleUrls: ['./send-nortification.component.scss'],
  providers: [MessageService, CheckBoxSelectionService]
})
export class SendNortificationComponent implements OnInit {
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Form = new FormGroup({
    nortType: new FormControl(''),
    subject: new FormControl(''),
    recipient: new FormControl(''),
    message: new FormControl(''),
    address: new FormControl(''),
  });

  submitted = false;
  id: number = 0;
  token:any = '';
  myData:any
  fullName:any = [];
  selectedNames: string[] = [];
  rentees: any ;
  tenantAddress: any;
  address:Array<any> = []; //Declare an address variable name 

  constructor(private formBuilder: FormBuilder,
    private dash:DashboardService,
    private messageService: MessageService,
    private auth:AuthenticationService,
    private primengConfig: PrimeNGConfig, 
    private mess:NortificationsService) { }

  ngOnInit(): void {

    this.loading = false;
    this.primengConfig.ripple = true;
    this.Form = this.formBuilder.group({
      nortType: ['', Validators.required],
      subject: ['', Validators.required],
      recipient: ['', Validators.required],
      message: ['', Validators.required],
      address: ['', Validators.required],
    }
    );
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
    this.getLandLordAddress()
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  getLandLordAddress(){
    return this.dash.address(this.id).subscribe({
      next:data => {
        this.tenantAddress = data
        this.tenantAddress.forEach((element:any) => {
          this.address.push(element)
        });
      }
    })
  }

  caller(){
    for(let x = 0; x<this.Form.value.address.length; x++){
      this.dash.rentees(this.Form.value.address[x].p_address).subscribe({
        next:data => {
          this.rentees = data;
          }
        }
      )
    }
  }

  recipients(){

  }

  onSubmit(){
    this.submitted = true;

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

    for(let i=0; i<this.Form.value.recipient.length; i++){
      console.log(this.Form.value.recipient[i].tenant_id)
    }

    // let user = {
    //   nortType: this.Form.value.nortType,
    //   subject: this.Form.value.subject,
    //   recipient: this.Form.value.recipient,
    //   message: this.Form.value.message,
    // }

    // console.log(user)
    console.log(this.id)
  }
}
