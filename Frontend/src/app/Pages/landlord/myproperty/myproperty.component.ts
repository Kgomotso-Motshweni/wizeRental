import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LandlordService } from 'src/app/Services/landlord.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Property } from 'src/app/Interfaces/property';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styleUrls: ['./myproperty.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MypropertyComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  myProperty: any = [];
  myData:any = {};
  token:any = '';
  submitted:boolean = false;
  propertyInf:Property = new Property;

  constructor(
    private land:LandlordService, 
    private auth:AuthenticationService,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,
    private activeroute: ActivatedRoute,
    private route:Router) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.getProperty(userid);
  }

  getProperty(id:any){
    return this.land.getMyProperty(id).subscribe({
      next:data => {
        this.myData = data
        console.log(this.myData)
      }
    })
  }

  deleteProduct(details:Property){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this property name: ' + details.p_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.land.deleteMyProperty(details).subscribe();
        this.route.navigate(['/landlord/addproperty']);
        this.loading = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Property Deleted', life: 3000})
      },
      reject: () => {
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'You have rejected', life: 3000})
      }
    })
  }

  condition:Boolean = false;
  //Open a modal
  openNew(){
    //pass the datatypes in the modal class to modal

    this.propertyInf = {}
    this.condition = true;
    //Reset form every time you insert data
  }
  hideDialog(){
    this.condition = false;
    this.submitted = false;
  }

  editProduct(propertyIn: Property) {
    this.propertyInf = {...propertyIn};
  }

  saveEmployee(){
    this.submitted = true;// submit when the details are true/when form is not blank

  }
}
