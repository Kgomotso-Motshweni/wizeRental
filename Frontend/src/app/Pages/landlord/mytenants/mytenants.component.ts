import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mytenants',
  templateUrl: './mytenants.component.html',
  styleUrls: ['./mytenants.component.scss']
})
export class MytenantsComponent implements OnInit {

  searchProperty: any;
  router: any;
  constructor() { }


  gotoTenants(id:any){
    

    this.router.navigate(['/landlord/tenants'])    

  }
  ngOnInit(): void {
  }

}
