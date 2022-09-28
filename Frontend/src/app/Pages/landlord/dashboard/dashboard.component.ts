import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Payment } from '../../../Interfaces/payment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  totAmnt: number = 0;
  totPaid: number = 0;
  totUnPaid: number = 0;
  totNumTenants: any =0;
  rentees!: Array<Payment>;
  searchTenant: any;
  numroomsA: number = 0;
  numroomsO: number = 0;
  payment_array: Array<any> = [];
  my_properties: any;
  token: any;
  id: any;

  constructor(
    private dash: DashboardService,
    private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.loading = true;
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;


    this.dash.rentees(this.id).subscribe((rentee: any) => {
    
      this.rentees = rentee;
      
      for (let x = 0; x < this.rentees.length; x++) {
        //signed tenants revenue
        if (rentee[x].moa_status == "signed") {
          this.totAmnt = +this.totAmnt + +this.rentees[x].rent;
          //Room occupied
            this.numroomsO = this.numroomsO + 1;
          // paid tanants
          if (rentee[x].paymentstatus == true) {
            this.totPaid = +this.totPaid + +rentee[x].rent;
          }
          //unpaid tenants
          if (rentee[x].paymentstatus == false) {
            this.totUnPaid = +this.totUnPaid + +rentee[x].rent;
          }
        }
      }
     
      //Pending Tenants
      this.dash.getPendTenants(this.id ).subscribe((numTenants) => {

        this.totNumTenants = numTenants;
        this.totNumTenants = this.totNumTenants.length;
      
      })

      //Room available
      this.dash.getProperties(this.id).subscribe((properties) => {
        this.my_properties = properties;
        for (let x = 0; x < this.my_properties.length; x++) {
         
          this.numroomsA = +this.numroomsA + +this.my_properties[x].p_room;
        }
        this.loading = false;
      })

    
    })
  }
}
