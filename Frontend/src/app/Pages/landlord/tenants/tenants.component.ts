import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent} from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import { delay } from 'rxjs';
import { LandlordService } from 'src/app/Services/landlord.service';


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

  countTenants : number =0;
  rentees: Array<Payment> = [];
  searchTenant: any;
  totAmnt : number =0;
  numroomsO : number =0;
  totPaid : number = 0;
  totUnPaid : number =0;
  id: number = 0;
  numTenants: number = 0;
  totNotReceived: number = 0;
  totReceived: number = 0;
  numPending: number = 0;
  message: any;
  tenantAddress :any;
  token:any = '';
  code:any;
  attempts : number = 0;
  rente_id: any;

  Form = new FormGroup({
    usertype: new FormControl(''),
  });
  my_properties: any;
  numroomsA: number =0;
  number: number = 0;

  constructor(private dash:DashboardService,
    private router:Router, 
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private auth:AuthenticationService,private land:LandlordService) { }

  ngOnInit(): void {
    /* Returns a decode token that has user information 
      and only save the id of that user in a variable called id
    */
    this.loading = true
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    this.getLandLordAddress();
   
    if(this.attempts==0)
    {
      this.dash.rentees(this.id).subscribe((rentee:any)=>{
  
        this.rentees = rentee;
        //console.log("Initial tenants",rentee)
        for (let x = 0; x < this.rentees.length; x++) {
          //signed tenants revenue
          if (rentee[x].moa_status == "signed") {
            this.totAmnt = this.totAmnt + this.rentees[x].rent;
            
            //Room occupied
            this.numroomsO = this.numroomsO + 1;
            // paid tanants
            if (rentee[x].paymentstatus == true) {
              this.totPaid = +this.totPaid + (+rentee[x].rent);
            }
            //unpaid tenants
            if (rentee[x].paymentstatus == false) {
              this.totUnPaid = +this.totUnPaid + (+rentee[x].rent);
            }
            //open Rooms
            this.numroomsA = +this.numroomsA + +this.rentees[x].p_room;
          }
        }
        this.countTenants = this.rentees.length;
        this.loading = false;
      })
    }

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
        this.dash.deleteRentee(details).subscribe({
          next:data =>{
            this.loading = true
            this.message = data
            //Route back to the current page,  this helps in refreshing data
            this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/landlord/tenant'], {relativeTo: this.route})
            this.loading = false
            this.messageService.add({severity:'success', summary: 'Successful', detail: this.message.message, life: 3000})
          },error: err => {
            //show the message if unable to add new data
            this.message = err.error.message;
            this.loading = false
            this.messageService.add({severity:'error', summary: 'Error', detail: this.message, life: 3000})  
          }
        });
       },
      reject: () => {
        
        this.messageService.add({severity:'error', summary: 'Error', detail: 'You cancelled tenant delete', life: 3000})
      
      }
    })
  }

  //Get all Landlord property addresses  
  getLandLordAddress(){
    return this.land.address(this.id).subscribe({
      next:data => {
        this.loading = true
        this.tenantAddress = data
        this.number = this.tenantAddress.length
        this.loading = false
      }
    })
  }
  
  caller(){
    this.attempts = 1;

    this.totAmnt  = 0;
    this.numroomsO  =0;
    this.totPaid  = 0;
    this.totUnPaid  = 0;
    this.numroomsA = 0 ;

    if(this.Form.value.usertype == 'All'){
      let userData = {
        id: this.id
      }
      this.loading = true
      this.land.rentees(userData).subscribe((rentee:any)=>{
        //console.log(rentee)
        this.rentees = rentee;

        for (let x = 0; x < this.rentees.length; x++) {
          //signed tenants revenue
          if (rentee[x].moa_status == "signed") {
            this.totAmnt = this.totAmnt + this.rentees[x].rent;
            
            //Room occupied
            this.numroomsO = this.numroomsO + 1;
            // paid tanants
            if (rentee[x].paymentstatus == true) {
              this.totPaid = +this.totPaid + (+rentee[x].rent);
            }
            //unpaid tenants
            if (rentee[x].paymentstatus == false) {
              this.totUnPaid = +this.totUnPaid + (+rentee[x].rent);
            }
          }
          //open Rooms
          this.numroomsA = +this.numroomsA + +this.rentees[x].p_room;
        }
          

        this.countTenants = this.rentees.length;
        this.loading = false

      })
    }else{

      let userData = {
        id: this.id,
        p_name: this.Form.value.usertype
      }

      this.loading = true
      this.land.rentees(userData).subscribe((rentee:any)=>{
      // console.log(rentee)

        this.rentees = rentee;
        this.totAmnt  = 0;
        this.numroomsO  =0;
        this.totPaid  = 0;
        this.totUnPaid  = 0;
        this.numroomsA = 0 ;

        for (let x = 0; x < this.rentees.length; x++) {
          //signed tenants revenue
          if (rentee[x].moa_status == "signed") {
            this.totAmnt = this.totAmnt + this.rentees[x].rent;
            
            //Room occupied
            this.numroomsO = this.numroomsO + 1;
            // paid tanants
            if (rentee[x].paymentstatus == true) {
              this.totPaid = +this.totPaid + (+rentee[x].rent);
            }
            //unpaid tenants
            if (rentee[x].paymentstatus == false) {
              this.totUnPaid = +this.totUnPaid + (+rentee[x].rent);
            }
            //open Rooms
            this.numroomsA = +this.numroomsA + +this.rentees[x].p_room;
          }
        }
        this.countTenants = this.rentees.length;
        this.loading = false
      })
    }
  }

  updatePayment(index:any,status:any){
    this.rente_id = this.rentees[index].rentee_id
    const body = {
      "rentee_id":this.rente_id,
      "paymentStatus":status
    }
  
    this.loading = true
    this.land.updatePayment(body).subscribe(()=>{
      this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['/landlord/tenant'])
      this.loading = false
    })
  }
}
