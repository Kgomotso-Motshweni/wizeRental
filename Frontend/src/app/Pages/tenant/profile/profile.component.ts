import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Userinfor } from 'src/app/Interfaces/userinfor';
import { HttpHeaders } from '@angular/common/http';

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

  submitted = false; //bpplean
  userData: any = {};
  tenantInfor: any = {};
  preview: string = '';
  message: any;
  file: any;

  Form = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    cellno: new FormControl(''),
    profile: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private activeRoute:ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params[('userid')]
    this.getProfile(id)
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

  getProfile(userid:any){
    const userToken = localStorage.getItem('access_token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': `${userToken}`})
    };
    this.auth.getProfile(httpOptions, userid).subscribe({
      next:data =>{
        this.userData = data;
        this.tenantInfor = this.userData[0];
      }
    })
  }

  // selectThisImage(myEvent: any) {
  //   this.file = myEvent.target.files[0]; 
  // }


  handleFileInput(event:any) {
    const image = (event.target as any ).files[0];
    this.Form.patchValue({profile: image})
    console.log(image)
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result;
    } 
    reader.readAsDataURL(image);
  }
  
  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank
    
    if(this.Form.invalid)
    { 
      return
    }

    const formData = new FormData();
    formData.append('imageurl', this.Form.value.profile)
  


    let id = this.tenantInfor.userid;
  
    let user = {
      firstname:this.Form.value.firstname, 
      lastname:this.Form.value.lastname,
      cellno:this.Form.value.cellno,
      imageurl: this.Form.value.profile

     
    }
   console.log(user)

  this.auth.updateProfile(user, id).subscribe({
    next:data => {
      this.message = data
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;         
      this.router.onSameUrlNavigation = 'reload'; 
      this.messageService.add({
        key: 'tc', severity:'success', summary: 'Success', detail:  this.message.message, life: 3000
      });
    },
    error: err => {
      this.loading = false;
      this.messageService.add({
        key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
      });  
    }
  })
  }
}
