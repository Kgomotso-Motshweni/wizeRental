import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-nortification',
  templateUrl: './send-nortification.component.html',
  styleUrls: ['./send-nortification.component.scss'],
  providers: [MessageService]
})
export class SendNortificationComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
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
  rentees: any ;
  tenantAddress: any;
  message: any;
  address:Array<any> = []; //Declare an list array variable called address

  constructor(
    private formBuilder: FormBuilder,
    private dash:DashboardService,
    private messageService: MessageService,
    private auth:AuthenticationService,
    private mess:NortificationsService,
    private router:Router, ) { }

  ngOnInit(): void {
    this.loading = false;

    //Validate user form using reactive form 
    this.Form = this.formBuilder.group({
      nortType: ['', Validators.required],
      subject: ['', Validators.required],
      recipient: ['', Validators.required],
      message: ['', Validators.required],
      address: ['', Validators.required],
    });

    /* Returns a decode token that has user information 
      and only save the id of that user in a variable called id
    */
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
    this.getLandLordAddress()
  }

  //it traps errors in the form
  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;
  }

  //Get all Landlord property name
  getLandLordAddress(){
    this.loading = true;
    return this.dash.address(this.id).subscribe({
      next:data => {
        this.tenantAddress = data
        this.tenantAddress.forEach((element:any) => {
          this.address.push(element)
        });
        this.loading = false;
      }
    })
  }

  /* when click on any property from the dropdown receive that property value and 
    use it to get all tenants from that property
  */
  caller(){
    for(let x = 0; x<this.Form.value.address.length; x++){
      this.loading = true;
      this.dash.tenants(this.Form.value.address[x].accom_name).subscribe({
        next:data => {
          this.rentees = data;
          this.loading = false;
          }
        }
      )
    }
  }

  onSubmit(){
    this.submitted = true;
    //If form invalid don't send any data 
    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

    /* Extract only tenant id from an array of object(s) selected,
     send that information to the subscription
    */
    for(let i=0; i<this.Form.value.recipient.length; i++){
      let user = {
        nortType: this.Form.value.nortType,
        subject: this.Form.value.subject,
        recipient: this.Form.value.recipient[i].tenant_id,
        message: this.Form.value.message,
      }
      this.mess.sendMessage(user, this.id).subscribe({
        next:data => {
          this.loading = true;
          this.message = data

          this.messageService.add({ key: 'tc', severity:'success', summary: 'Success', detail: this.message.message, life: 3000})
          
          //router back to tenants page
          this.router.navigate(['/landlord/tenant/'])
          
          //turn off the loader 
          this.loading = false;
        },error: err => {
          this.loading = false;
          //show the message if unable to add new data
          this.message = err.error.message;
          this.messageService.add({ key: 'tc', severity:'error', summary: 'Error', detail: this.message, life: 3000}) 
        }
      })
    }
  }
}
