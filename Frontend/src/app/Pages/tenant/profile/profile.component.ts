import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Userinfor } from 'src/app/Interfaces/userinfor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Form = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    profile: new FormControl(''),
  });
  
  submitted = false; //bpplean
  userToken: any;
  role: any;
  myData: any = {};
  userdata: any = {}
  fullname: any;
  userinfor: any = {};
  OneUserInfor: any = {};
  decodedToken: any = {};
  tenantInfor: Userinfor = new Userinfor;

  constructor(private formBuilder: FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private activeRoute:ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getProfile()
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



  // editProduct(tenantInfor: Userinfor) {
  //   this.tenantInfor = {...tenantInfor};
  // }

  getProfile(){
    let token:any = localStorage.getItem("access_token");
    this.userinfor = this.auth.getDecodedAccessToken(token).regData[0];
    this.tenantInfor = {...this.userinfor};
    console.log(this.tenantInfor)
  }

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    let id = this.tenantInfor.userid;
    let user = {
      firstname:this.tenantInfor.firstname, 
      lastname:this.tenantInfor.lastname,
      cellno:this.tenantInfor.cellno
    }
    this.auth.updateProfile(user, id).subscribe({
      next:data => {
        console.log(data)
      }
    })
  }
}
