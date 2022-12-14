import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { MustMatch } from './confirmPassword/validation';
import { ConfirmationService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent implements OnInit {

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
  ViewDialog: boolean = false;
  check:boolean = false;

  constructor(private formBuilder: FormBuilder, 
    public auth:AuthenticationService, 
    private router:Router,
    private messageService: MessageService,
    private __loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.__loader.stop();
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

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    if(this.Form.invalid)
    { 
      this.__loader.stop();
      return
    }
    let user_role = this.Form.value.usertype;
  
    let user = {
      firstname: this.Form.value.fname,
      lastname: this.Form.value.lname,
      email: this.transform(this.Form.value.email),
      cellno: this.Form.value.phone,
      password: this.Form.value.password,
      imageUrl: "https://www.pngitem.com/pimgs/m/294-2947257_interface-icons-user-avatar-profile-user-avatar-png.png"
    }

    this.auth.register(user, user_role).subscribe({
      next:data => {
        this.__loader.start();
        //Reset the form after successful register before routing to login
        this.Form.reset();
        this.messageService.add({
          key: 'tc', severity:'success', summary: 'Success', detail: "Registration Sucessfull. Let's start working", life: 3000
        });  
        this.__loader.stop();
        this.router.navigate(['/login'])
      },
      error: err => {
        this.__loader.stop();
        this.messageService.add({
          key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });  
      }
    });
  }

  checkit(){
    this.check = true;
  }
 
  //Show the dialog for terms and Conditions 
  showResponsiveDialog() {
    this.ViewDialog = true;
  }

  //Hide The dialog for terms and condition
  hideDialog() {
    this.ViewDialog = false
  }

  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
