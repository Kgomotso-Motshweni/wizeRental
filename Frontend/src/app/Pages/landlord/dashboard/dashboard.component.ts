import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  totAmnt : number = 0;
  paidAmnt : number = 0;
  rentees : any
  searchTenant : any;
  unpaidAmnt :number =0;
  numTenants :number | undefined;
  payment_status: number[] | undefined;

  // let list: number[] = [1, 2, 3];


  
  constructor(private dash:DashboardService,private router:Router, private route: ActivatedRoute) { }

  month: any = [1,3,5,7.8]

  paid:any

  

  deleteUser(id:any)
  {
    console.log("inside")
     this.dash.deleteRentee(this.rentees[id].rentee_id).subscribe((rent_id)=>{
        
  //reload page after delete
        this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.router.onSameUrlNavigation = "reload";
            this.router.navigate(['/landlord/dash'], {relativeTo: this.route})

     })
  }


  paymentStats(id:any){

  }

  ngOnInit(): void {

    this.dash.rentees().subscribe((rentee)=>{
      this.rentees = rentee;
      
      console.table(this.rentees)


      //Monthly Revenue
      for(let x=0;x<this.rentees.length;x++){
       
          this.totAmnt = +this.totAmnt + +this.rentees[x].rent; 
          this.payment_status = this.rentees[x].paymentStatus
      }

      //Received Amount
      this.dash.paymentStatus().subscribe((payment)=>{
        console.table(payment)
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
}
