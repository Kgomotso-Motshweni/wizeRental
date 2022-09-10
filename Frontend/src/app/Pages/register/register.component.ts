import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MustMatch } from './confirmPassword/validation';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Form = new FormGroup({
    usertype: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
    acceptTerms: new FormControl('')
  });

  submitted = false; 
  userToken: any;
  role: any;
  currentUser: any = {};
  myData: any = {};
  decodedToken: any = {};
  ViewDialog: boolean = false;
  displayResponsive: boolean = false

  constructor(private formBuilder: FormBuilder, 
    public auth:AuthenticationService, 
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loading = false;
    this.Form = this.formBuilder.group({
      usertype: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmpassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },{//Compares the two passwprds if they match
      validator:MustMatch("password","confirmpassword"),
    }
    );
  }
  
  keyPressAlphanumeric(event: { keyCode: number; preventDefault: () => void; }) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  // iftenant(){
  //   if(this.Form.value.role == "tenant"){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }


  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    if(this.Form.invalid)
    { 
      return
    }
    let user_role = this.Form.value.usertype;
    let user = {
      firstname: this.Form.value.fname,
      lastname: this.Form.value.lname,
      email: this.Form.value.email,
      cellno: this.Form.value.phone,
      password: this.Form.value.password
    }

    this.auth.register(user, user_role).subscribe({
      next:data => {
        this.myData = data;
        this.userToken = this.myData.token;
        this.decodedToken = this.auth.getDecodedAccessToken(this.userToken); //returns a decoded data from token

        this.role = this.decodedToken.regData.user_role
        localStorage.setItem('access_token', this.userToken);
        this.Form.reset();
        this.router.navigate(['/login'])
        this.messageService.add({
          key: 'tc', severity:'success', summary: 'Success', detail: "Registration Sucessfull. Let's start working", life: 3000
        });  
      },
      error: err => {
        this.loading = false;
        this.messageService.add({
          key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });  
      }
    });
  }
  popUp() : void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'terms and condition',
      icon: 'pi pi-exclamation-triangle',
    })
  }
  check:boolean = false;

  checkit(){
    this.check = true;
  }

 
  showResponsiveDialog() {
    this.ViewDialog = true;
  }

  hideDialog() {
    this.ViewDialog = false
  }

  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
