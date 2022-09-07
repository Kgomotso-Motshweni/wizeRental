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

  
  submitted = false; //bpplean
  userToken: any;
  role: any;
  myData: any = {};
  fullname: any;
  errorMessage = '';


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
    this.auth.login(user);
    

    //   this.email = data.arrData[0].email;
    //   this.userType = data.arrData[0].usertype;
    //   this.fullname = data.arrData[0].firstname;
    //   this.id = data.arrData[0].userid;
    //   console.log(this.email);
    //   console.log(this.userType);


    //    sessionStorage.setItem('user_details', data);
    //    localStorage.setItem('user_id', this.id);
    //    localStorage.setItem('username', this.fullname);
    //    localStorage.setItem('email', this.email);

    //    if(this.userType == 'coordinator'){
    //       this.logedtype =  "Logged user: "+this.fullname+" "+this.email;
    //       this.logeduser = "usertype as: "+this.userType 
    //       this.router.navigate(['/coordinator'])
    //    }else{
    //       this.logedtype =  "Logged user: "+this.fullname+" "+this.email;
    //       this.logeduser = "usertype as: "+this.userType;
    //       this.router.navigate(['/responded'])
    //    }
    // },(err) => {
    //     this.errorMessage = err.message;
    //   }
    // );

    // localStorage.setItem('access_token',  this.userToken)
        
    // //route to dashboard if login was successful

    // if(this.userToken == 'landlord'){    
    //   this.router.navigate(['/landlord'])
    // }else if(this.userToken == 'tenant'){ 
    //   this.router.navigate(['/'])
    // }else{
    //   this.messageService.add({
    //     key: 'tc', severity:'error', summary: 'Error', detail: "Incorrecnt credentials", life: 3000
    //   });  
    // }
  }

  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
}
