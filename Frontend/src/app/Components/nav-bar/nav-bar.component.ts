import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public auth:AuthenticationService,   
  ) { }
  
  Full_Name:any ='';

  ngOnInit(): void {
    this.Full_Name = this.auth.fullname;
    console.log(this.Full_Name)

  }

  Logout(){
    this.auth.doLogout()
  }

}
