import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {

  Full_Name:any = '';
  token:any = '';
  totalNumber: number = 0;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.Full_Name = this.substring(this.token.regData[0].firstname );
  }

  substring(value:any): string{
    let letter = this.transform(value.substring(0,1)) + value.substring(1); 
    return letter
  }

  transform(value:any): string {
    let first = value.toUpperCase();
    return first; 
  }
  visibleSidebar2: boolean = false;

}
