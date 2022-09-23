import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  rentees: any ;
  searchTenant: any;
  id: number = 0;
  numTenants: number = 0;
  totNotReceived: number = 0;
  totReceived: number = 0;
  numPending: number = 0;
  message: any;
  tenantAddress: any;
  token:any = '';
  code:any;
  Form = new FormGroup({
    usertype: new FormControl(''),
    
  });

  constructor(private dash:DashboardService,
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,
    private auth:AuthenticationService) { }

  ngOnInit(): void {
    /* Returns a decode token that has user information 
      and only save the id of that user in a variable called id
    */
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    this.getLandLordAddress();
    this.code;
  }

  /*
  use Payment interface to receive all the data of a tenant you want to delete and 
  then use primeNG component for confrm delete and a dialog to confirm first before you can delete a 
  specific tenant
  */
  deleteUser(details:Payment){
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this: ' + details.full_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(details)
        this.loading = true;
        this.dash.deleteRentee(details).subscribe({
          next:data =>{
            this.loading = true;
            this.message = data
            //Route back to the current page,  this helps in refreshing data
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/landlord/'], {relativeTo: this.route})
            this.loading = false;
            this.messageService.add({severity:'success', summary: 'Successful', detail: this.message.message, life: 3000})
          },error: err => {
            this.loading = false;
            //show the message if unable to add new data
            this.message = err.error.message;
            this.messageService.add({severity:'error', summary: 'Error', detail: this.message, life: 3000}) 
          }
        });
       },
      reject: () => {
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'You cancelled tenant delete', life: 3000})
      }
    })
  }

  //Get all Landlord property addresses
  getLandLordAddress(){
    return this.dash.address(this.id).subscribe({
      next:data => {
        this.tenantAddress = data
      }
    })
  }


  /* when click on any property from the dropdown receive that property value and 
    use it to get all tenants from that property
  */
  caller(){
    return this.dash.rentees(this.Form.value.usertype).subscribe({
      next:data => {
        this.rentees = data;
          console.log(this.rentees )
      }
    })
  }
}
