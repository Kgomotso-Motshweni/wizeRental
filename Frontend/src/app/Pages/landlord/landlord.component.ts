import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor( private auth:AuthenticationService,) { }
  name: any
  totalNumber:number = 0;
  ngOnInit(): void {
    this.name = "James"
    this.totalNumber = 4;
  }

  Logout(){
    this.auth.doLogout()
  }

}
