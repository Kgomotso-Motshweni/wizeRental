import { Component, OnInit } from '@angular/core';
import { LandingService } from 'src/app/Services/landing.service';

@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.component.html',
  styleUrls: ['./viewproperty.component.scss']
})
export class ViewpropertyComponent implements OnInit {

  constructor(private serv: LandingService) { }

  ngOnInit(): void {
  }

  //get property by id
  // accName:any;
  // price:any;
  // address:any;
  // rooms:any;
  // bedrooms:any;

  // getProperty(nump: any){
    


  // }

}
