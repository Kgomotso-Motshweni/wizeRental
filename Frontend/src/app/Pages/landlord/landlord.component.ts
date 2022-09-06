import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landlord',
  templateUrl: './landlord.component.html',
  styleUrls: ['./landlord.component.scss']
})
export class LandlordComponent implements OnInit {

  constructor() { }
  name: any
  totalNumber:number = 0;
  ngOnInit(): void {
    this.name = "James"
    this.totalNumber = 4;
  }

}
