import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { Pending } from 'src/app/Interfaces/pending';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})

export class PendingComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  pending: any;
  submitted: boolean = false;
  pendingClients: Pending = new Pending;
  condition:Boolean = false;
  token:any = '';
  id:number = 0;
  constructor(private dash: DashboardService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    this.getPending(this.id);
  }

   //Pending Tenants
   getPending(user:number){
    this.dash.getPendTenants(user).subscribe({
      next:data  => {
          this.pending = data;
        }
      }
    )
   }
  
  //hide the Form
  hideInsertform(){
    this.condition = false;
    this.submitted = false;
  }

  //reuse the form for editing 
  editProperty(details:Pending) {
    this.condition = true;
    this.pendingClients = {...details}
  }
}
