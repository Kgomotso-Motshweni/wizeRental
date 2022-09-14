import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  totAmnt : number = 0;
  rentees : any
  searchTenant : any;
  
  constructor(private dash:DashboardService,private router:Router, private route: ActivatedRoute,) { }

  month: any = [1,3,5,7.8]
  

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

  ngOnInit(): void {

    this.dash.rentees().subscribe((rentee)=>{
      
      this.rentees = rentee;

      console.table(this.rentees)


      //Monthly Revenue
      for(let x=0;x<this.rentees.length;x++){
       
          this.totAmnt = +this.totAmnt + +this.rentees[x].rent;
      }

      //Received Amount


      //Unpaid Amount


      //Available Rooms


      //Occupied Rooms

      //pending Tenants



    })




  }

}
