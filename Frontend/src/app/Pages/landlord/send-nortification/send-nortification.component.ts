import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { NortificationsService } from 'src/app/Services/nortifications.service';
import { CheckBoxSelectionService } from '@syncfusion/ej2-angular-dropdowns';
import { SelectItem, PrimeNGConfig } from "primeng/api";

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
  constructor(private formBuilder: FormBuilder, 
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
    this.getMyUsers();
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  getMyUsers(){
    return this.mess.getMyTenantesInfor(this.id).subscribe({
      next:data =>{
        this.loading = true;

        this.myData = data
        this.loading = false;
        this.myData.forEach((element:any) => {
          this.fullName.push(element)
        });
      }
    })
  }

  onSubmit(){
    this.submitted = true;

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

    let user = {
      email: this.Form.value.nortType,
      password: this.Form.value.subject,
      recipient: this.Form.value.recipient,
      message: this.Form.value.message,
    }

    console.log(user)
    console.log(this.id)
  }
}
