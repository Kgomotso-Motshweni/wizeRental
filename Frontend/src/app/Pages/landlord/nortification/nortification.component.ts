import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import {NortificationsService} from 'src/app/Services/nortifications.service';

@Component({
  selector: 'app-nortification',
  templateUrl: './nortification.component.html',
  styleUrls: ['./nortification.component.scss']
})
export class NortificationComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  constructor(private receive:NortificationsService) {
    // createTask(){
    //   const Task = { 
    //    taskname: this.formCreate.value.taskname,
    //    date: this.formCreate.value.date,
    //    time:  this.formCreate.value.time,
    //   userid:'3'
    //   }
    //   console.log (Task)
    //   this.taskS.createTask(Task).subscribe(()=>{console.log(" Task created")})
    //   }
      

    // createTask(body:any){
    //   return this.http.put("http://localhost:8000/createT",body)
    // }
    
   }

   notification()
   {
    this.receive.landlordReceive(1).subscribe((responsetenant)=>{
     this.response = responsetenant

    })
   }
   response :any
  ngOnInit(): void {
  }
  

}
