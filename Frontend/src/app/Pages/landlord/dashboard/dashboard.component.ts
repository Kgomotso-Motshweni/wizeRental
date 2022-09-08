import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 
  rentees : any
  
  constructor(private dash:DashboardService) { }

  month: any = [1,3,5,7.8]
  

  ngOnInit(): void {
    this.dash.rentees().subscribe((rentee)=>{
      
      this.rentees = rentee;

      console.table(this.rentees)
    })
  }

}
