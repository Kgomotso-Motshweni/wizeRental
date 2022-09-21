import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

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



  totAmnt : number = 0;
  paidAmnt : number = 0;
  rentees! : Array<Payment> ;
  searchTenant : any;
  unpaidAmnt :number =0;
  numTenants :number | undefined;
  payment_status!: Boolean ;
  pay_status: any;
  month: any = [1,3,5,7.8]
  totNotReceived: number = 0;
  totReceived: number = 0;
  numPending: number = 0;
  totExpected: number = 0;
  message: any;
  paid:any

  payment_array:Array<any>=[];
  // let list: number[] = [1, 2, 3];

  constructor(private dash:DashboardService,
    private router:Router, 
    private route: ActivatedRoute,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {

    this.dash.rentees(1).subscribe((rentee:any)=>{
      this.rentees = rentee;
      



      //Monthly Revenue
      for(let x=0;x<this.rentees.length;x++){
       
        this.payment_array[x] = this.rentees[x].paystatus;
     
          this.totAmnt = +this.totAmnt + +this.rentees[x].rent; 
          this.payment_status = this.rentees[x].paymentstatus
      }

      //Received Amount
      this.dash.paymentStatus().subscribe((payment)=>{
        // console.table(payment)
        this.paid = payment;
      })

      //paid Amount
      for(let x=0;x<this.rentees.length;x++){
       
        if(this.rentees[x].paystatus=="true"){
         
        this.paidAmnt  = +this.paidAmnt  + +this.rentees[x].rent;
        }
    }
      //Unpaid Amount
      this.unpaidAmnt = +this.totAmnt - +this.paidAmnt;

      //Available Rooms


      //Occupied Rooms
      this.numTenants = this.rentees.length;
      
      //pending Tenants
      // console.log("ghjkpl",this.paymentStats)
    })
  }

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

  paymentStats(id:any){

  }


   _index(payment:any){

 
   return false
   
  }


  get_Payment_Status(){
    let status = this.pay_status
    return status;
  }
}
