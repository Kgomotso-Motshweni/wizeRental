import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MustMatch } from './confirmPassword/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
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
    profile: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });

  submitted = false; 
  userToken: any;
  role: any;
  currentUser: any = {};
  myData: any = {};
  decodedToken: any = {};

  constructor(private formBuilder: FormBuilder, 
    public auth:AuthenticationService, 
    private router:Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loading = false;
    this.Form = this.formBuilder.group({
      usertype: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'), Validators.maxLength(12)]],
      profile: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmpassword: ['', Validators.required],
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

  iftenant(){
    if(this.Form.value.role == "tenant"){
      return true;
    }
    else{
      return false;
    }
  }


  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }
    let user_role = this.Form.value.usertype; 

    let user = {//assign all entered values in the form to a variable user
      firstname: this.Form.value.fname,
      lastname: this.Form.value.lname,
      email: this.transform(this.Form.value.email),
      cellno: this.Form.value.phone,
      password: this.Form.value.password
    }

    console.log(user_role)
    console.log(user)

     
  }
  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
