import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Userinfor } from 'src/app/Interfaces/userinfor';
import { HttpHeaders } from '@angular/common/http';
import { TenantsService } from 'src/app/Services/tenants.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  submitted = false; //bpplean
  userData: any = {};
  tenantInfor: Userinfor = new Userinfor;
  preview: string = '';
  message: any;
  file: any;
  formData = new FormData();

  constructor(
    private tenants:TenantsService,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private messageService: MessageService,
    private __loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.__loader.start();
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
 
    this.tenants.getProfile(httpOptions, userid).subscribe({
      next:data =>{
        this.userData = data;
        this.editProduct(this.userData[0])
        this.__loader.stop();
      }
    })
  }

  //push the data from userInfor  into  tenantInfo and crop it according to our interface/Model
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
    this.__loader.start();
    this.formData.append('firstname', this.tenantInfor.firstname)
    this.formData.append('lastname', this.tenantInfor.lastname)
    this.formData.append('cellno', this.tenantInfor.cellno)
    this.formData.append('image', this.file)

    console.log(this.tenantInfor.cellno);
    
    let id = this.tenantInfor.userid;

    //Update user profile information
    this.tenants.updateProfile(this.formData, id).subscribe({
      next:data => {
    
        this.message = data

        //Reload the Page
        this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
        this.router.onSameUrlNavigation = "reload";

        //Show Successful Message ifn there is no error
        this.messageService.add({
          key: 'tc', severity:'success', summary: 'Success', detail:  this.message.message, life: 3000
        });
        this.__loader.stop();
      },
      error: err => {
        this.__loader.stop();
        this.messageService.add({
          key: 'tc', severity:'error', summary: 'Error', detail: err.error.message, life: 3000
        });  
      }
    })
  }
}
