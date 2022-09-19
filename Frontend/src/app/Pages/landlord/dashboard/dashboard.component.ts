import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;



//   myobject = [{
//     "applicant_id":"2",
//     "property_id":"4",
//     "full_Name":"cai",
//     "unit":"222",
//     "rent":"200",
//     "moaStart":"21-JAN-2022",
//     "moaEnd":"21-FEB-2022",
//     "rent_paid":"2000",
//     "create_time":"2022-06-21 01:00:00",
//     "r_update_time":"2022-06-21 01:00:30",
//     "payStatus":"false",
//     "paymentstatus":false
//   },
//   {
//     "applicant_id":"2",
//     "property_id":"4",
//     "full_Name":"cai",
//     "unit":"222",
//     "rent":"200",
//     "moaStart":"21-JAN-2022",
//     "moaEnd":"21-FEB-2022",
//     "rent_paid":"2000",
//     "create_time":"2022-06-21 01:00:00",
//     "r_update_time":"2022-06-21 01:00:30",
//     "payStatus":"false",
//     "paymentstatus":false
//   },
//   {
//     "applicant_id":"2",
//     "property_id":"4",
//     "full_Name":"cai",
//     "unit":"222",
//     "rent":"200",
//     "moaStart":"21-JAN-2022",
//     "moaEnd":"21-FEB-2022",
//     "rent_paid":"2000",
//     "create_time":"2022-06-21 01:00:00",
//     "r_update_time":"2022-06-21 01:00:30",
//     "payStatus":"false",
//     "paymentstatus":true
//   },
//   {
//     "applicant_id":"2",
//     "property_id":"4",
//     "full_Name":"cai",
//     "unit":"222",
//     "rent":"200",
//     "moaStart":"21-JAN-2022",
//     "moaEnd":"21-FEB-2022",
//     "rent_paid":"2000",
//     "create_time":"2022-06-21 01:00:00",
//     "r_update_time":"2022-06-21 01:00:30",
//     "payStatus":"false",
//     "paymentstatus":true
//   }
// ]

 
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

  paid:any

  payment_array:Array<any>=[];
  // let list: number[] = [1, 2, 3];

  constructor(private dash:DashboardService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.dash.rentees().subscribe((rentee:any)=>{
      this.rentees = rentee;
      
      console.table(this.rentees)


      //Monthly Revenue
      for(let x=0;x<this.rentees.length;x++){
       
        this.payment_array[x] = this.rentees[x].paystatus;
        console.table(this.payment_array)
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


  deleteUser(id:any)
  {
    console.log("inside")
     this.dash.deleteRentee(this.rentees[id].rentee_id).subscribe((rent_id)=>{
        
  //reload page after delete
        this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/landlord/'], {relativeTo: this.route})

     })
  }


  paymentStats(id:any){

  }


   _index(payment:any){

   console.log(payment)
   return false
   
  }


  get_Payment_Status(){
    let status = this.pay_status
    return status;
  }
}
