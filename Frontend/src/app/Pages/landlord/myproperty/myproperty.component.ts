import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LandlordService } from 'src/app/Services/landlord.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Property } from 'src/app/Interfaces/property';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styleUrls: ['./myproperty.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MypropertyComponent implements OnInit {
  myData:any;
  token:any = '';
  id: number = 0;
  number:number = 0;

  constructor(
    private land:LandlordService, 
    private auth:AuthenticationService,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,
    private route:Router,
    private __loader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.__loader.start();
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
    this.getProperty(userid);
  }

  getProperty(id:any){
    return this.land.getMyProperty(id).subscribe({
      next:data => {
       
        this.myData = data
        this.number = this.myData.length
        this.__loader.stop();
      }
    })
  }

  /*Use primeNG dialogs and message service in order to use this delete module */
  deleteProduct(details:Property){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this property name: ' + details.p_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => { 
        this.land.deleteMyProperty(details).subscribe({  
          next:data =>{
            this.__loader.start();
            //Route back to the current page,  this helps in refreshing data
            this.route.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.route.onSameUrlNavigation = "reload";
            this.messageService.add({severity:'success', summary: 'Successful', detail: "Successfuly Deleted", life: 3000})
            this.route.navigate(['/landlord/myproperty']);  
            this.__loader.stop();
          },error: err => {
            //show the message if unable to add new data
            this.__loader.stop();
            this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000}) 
          }
        });
       },
      reject: () => {
        this.__loader.stop();
        this.messageService.add({severity:'error', summary: 'Error', detail: 'You cancelled property delete', life: 3000})
      }
    })
  }
  
}
