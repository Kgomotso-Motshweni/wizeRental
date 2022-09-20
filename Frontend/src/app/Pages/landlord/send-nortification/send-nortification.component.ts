import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
@Component({
  selector: 'app-send-nortification',
  templateUrl: './send-nortification.component.html',
  styleUrls: ['./send-nortification.component.scss'],
  providers: [MessageService]
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
  });

  submitted = false;
  id: number = 0;
  token:any = '';

  constructor(private formBuilder: FormBuilder, 
    private messageService: MessageService,
    private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
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
