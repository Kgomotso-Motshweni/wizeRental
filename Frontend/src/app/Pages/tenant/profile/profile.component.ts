import { Component, OnInit, ViewChild } from '@angular/core';
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
  preview: string = '';
  message: any;
  file: any;
  formData = new FormData();

  constructor(
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
        this.editProduct(this.userData[0])
      }
    })
  }

  editProduct(tenantInfor: Userinfor) {
    this.tenantInfor = {...tenantInfor};
  }

  handleFileInput(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result;
    }
    reader.readAsDataURL(image);
  }

  onSubmit():void{
    this.submitted = true;// submit when the details are true/when form is not blank
    
    this.formData.append('firstname', this.tenantInfor.firstname)
    this.formData.append('lastname', this.tenantInfor.lastname)
    this.formData.append('cellno', this.tenantInfor.cellno)
    this.formData.append('image', this.file)

    let id = this.tenantInfor.userid;

    this.auth.updateProfile(this.formData, id).subscribe({
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
