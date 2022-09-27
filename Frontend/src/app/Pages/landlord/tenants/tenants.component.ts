import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { delay } from 'rxjs';
import { TenantService } from 'src/app/Services/tenant.service';



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
  rentees!: Array<Payment>;
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
  Form = new FormGroup({
    usertype: new FormControl(''),
    
  });
  rente_id: any;
 

  constructor(private dash:DashboardService,
    private router:Router, 
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private auth:AuthenticationService,private tenant:TenantService) { }

  ngOnInit(): void {
    /* Returns a decode token that has user information 
      and only save the id of that user in a variable called id
    */
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    

    this.getLandLordAddress();
   


    this.dash.rentees(this.id).subscribe((rentee:any)=>{
      this.rentees = rentee;

       for (let x = 0; x < this.rentees.length; x++) {

        //signed tenants revenue
        if (rentee[x].moa_status == "signed") {
         
          this.totAmnt = this.totAmnt + this.rentees[x].rent;
          console.log("gjhkl,",this.rentees[x].rent)

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
      }
      this.countTenants = this.rentees.length;

    })


    console.log(this.attempts)



  
  }


  /*
  use Payment interface to receive all the data of a tenant you want to delete and 
  then use primeNG component for confrm delete and a dialog to confirm first before you can delete a 
  specific tenant
  */
  deleteUser(index:any) {
    this.id = this.rentees[index].rentee_id;
      this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            this.dash.deleteRentee(this.id).subscribe(()=>{
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/landlord/tenant'], { relativeTo: this.route });
          })
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                   
      
                        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                        this.router.onSameUrlNavigation = 'reload';
                        this.router.navigate(['/landlord/tenant'], { relativeTo: this.route });
                    
  
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
            
             
  
                   

        }
    });
}

  //Get all Landlord property addresses
  
  getLandLordAddress(){
   
    return this.tenant.address(this.id).subscribe({
      next:data => {
        this.tenantAddress = data
        console.log(this.tenantAddress)
      }
    })

  }

  /* when click on any property from the dropdown receive that property value and 
    use it to get all tenants from that property
  */

  caller(){

    this.attempts = 1;

    if(this.attempts == 1 ){
   
       return this.tenant.rentees(this.Form.value.usertype).subscribe((rentee:any)=>{
      
      this.rentees = rentee;
      console.table(this.rentees)


      //reset values 
      this.totPaid = 0;
      this.totUnPaid = 0;


      for (let x = 0; x < this.rentees.length; x++) {

        //signed tenants revenue
        if (rentee[x].moa_status == "signed") {
         
          this.totAmnt = this.totAmnt + rentee[x].rent;
          console.log("gjhkl,",rentee[x].p_room)

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
      }
      this.countTenants = this.rentees.length;

    })

   

   }else{
    return this.dash.rentees(this.id).subscribe((rentee:any)=>{
      this.rentees = rentee
      this.totPaid = 0;
      this.totUnPaid = 0;

      console.table(this.rentees)

      for (let x = 0; x < this.rentees.length; x++) {

        //signed tenants revenue
        if (rentee[x].moa_status == "signed") {
         
          this.totAmnt = this.totAmnt + rentee[x].rent;
          console.log("gjhkl,",rentee[x].rent)

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
      }
      this.countTenants = this.rentees.length;
    })
  }
 
  }

  updatePayment(index:any,status:any){
    this.rente_id = this.rentees[index].rentee_id
    
    const body = {
       "rentee_id":this.rente_id,
       "paymentStatus":status
    }

    this.tenant.updatePayment(body).subscribe(()=>{
    })
  }

}
