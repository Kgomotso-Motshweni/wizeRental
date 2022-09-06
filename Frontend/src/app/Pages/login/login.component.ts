import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  
  submitted = false; //bpplean
  userToken: any = {};

  constructor(private formBuilder: FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loading = false;
    this.Form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    });
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
    let user = {
      //convert the email entered to lowercase even if it is written in uppercase
      email: this.transform(this.Form.value.email),
      password: this.Form.value.password
    }
    this.auth.login(user).subscribe({
      next:data =>{
        this.loading = true;
        this.userToken = data
        localStorage.setItem('access_token', this.userToken.token)
        //route to dashboard if login was successful
        this.loading = false;
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
