import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {


  pendingCount = [1,2,3];
  pendingStatus = false;

  constructor() { }


  ngOnInit(): void {

    if(this.pendingCount.length!=0)
    {
        this.pendingStatus = true
    }

  }

}
