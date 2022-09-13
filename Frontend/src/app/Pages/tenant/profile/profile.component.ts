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
  tenantInfor: Userinfor = new Userinfor;
  imageSrc: string = '';
  message: any;
  file: any;

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
        this.userData = data
        this.Updateuser( this.userData[0])
      }
    })
  }

  Updateuser(tenantInfor: Userinfor){
    this.tenantInfor = {...tenantInfor};
  }

  onFileChange(myEvent: any) {
    this.imageSrc = myEvent.target.files[0].name; 
  }

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank

    let id = this.tenantInfor.userid;
    let user = {
      firstname:this.tenantInfor.firstname, 
      lastname:this.tenantInfor.lastname,
      cellno:this.tenantInfor.cellno,
      imageUrl:this.imageSrc
      // imageUrl:this.file
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
