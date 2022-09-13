import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  
  submitted = false;
  userToken: any;
  role: any;
  myData: any = {};
  decodedToken: any = {};

  constructor(private formBuilder: FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private activeRoute:ActivatedRoute,
    private messageService: MessageService,) { }

  ngOnInit(): void {
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
      email: this.Form.value.email,
      password: this.Form.value.password
    }
    
    this.auth.login(user).subscribe({
      next:data => {
        this.myData = data;
        this.userToken = this.myData.token;
        this.decodedToken = this.auth.getDecodedAccessToken(this.userToken); //returns a decoded data from token

        this.role = this.decodedToken.regData[0].user_role;

        localStorage.setItem('access_token', this.userToken);
        localStorage.setItem('role', this.role);
        if(this.role == 'Landlord'){
          this.router.navigate(['/landlord/'])

        }else if(this.role == 'Tenant'){
          this.router.navigate(['/tenant/'])
        }
      },
      error: err => {
        this.loading = false;
        this.messageService.add({
          key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });  
      }
    });
  }

  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
