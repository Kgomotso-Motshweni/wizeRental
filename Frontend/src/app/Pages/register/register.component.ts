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
    password: new FormControl(''),
    confirmpassword: new FormControl(''),
  });

  currentUser = {};
  userToken: any = {}
  submitted = false; 
 
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

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }
    let user = {//assign all entered values in the form to a variable user
      fname: this.Form.value.fname,
      lname: this.Form.value.lname,
      email: this.transform(this.Form.value.email),
      password: this.Form.value.password
    }

    this.auth.register(user).subscribe({
      next:data =>{
        this.loading = false;
        this.userToken = data
        localStorage.setItem('access_token', this.userToken.token)
        //route to dashboard if login was successful
        this.loading = true;
        this.router.navigate(['/dash'])

        //call user the getprofile function pass the token as an argument
      },
      error: err => {
        this.loading = false;
        this.messageService.add({
          key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });  
      }
    })
  }
  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
