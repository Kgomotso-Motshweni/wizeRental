import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { Pending } from 'src/app/Interfaces/pending';

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

  pending: any = [];
  submitted: boolean = false;
  pendingClients: Pending = new Pending;
  condition:Boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }


  //hide the Form
  hideInsertform(){
    this.condition = false;
    this.submitted = false;
  }

  //reuse the form for editing 
  editProperty() {
    this.condition = true;
   
  }
}
