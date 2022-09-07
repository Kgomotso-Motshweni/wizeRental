import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from 'src/app/Components/Landlord/dashboard.component';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor(private dash:DashboardService) { }


  ngOnInit(): void {
   
  }

}
