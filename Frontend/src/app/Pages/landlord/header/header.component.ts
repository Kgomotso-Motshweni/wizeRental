import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  Full_Name:any = '';
  token:any = '';
  totalNumber: number = 1;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    //this.Full_Name = this.transform(this.token.regData[0].firstname );
    // this.Full_Name = this.substring(this.token.regData[0].firstname ); //uncomment this
    // console.log(this.token.regData[0])//uncomment this
  }

  //Receive an entire string, take the first letter and transform it into uppercase 
  substring(value:any): string{
    let letter = this.transform(value.substring(0,1)) + value.substring(1); 
    return letter
  }

  //Transform Strings to uppercase letter
  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }
  visibleSidebar2: boolean = false;
}
