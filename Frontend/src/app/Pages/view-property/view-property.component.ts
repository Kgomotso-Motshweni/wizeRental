import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Pending } from 'src/app/Interfaces/pending';
import { TenantsService } from 'src/app/Services/tenants.service';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';
import { LandingPageService } from 'src/app/Services/landing-page.service';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss']
})
export class ViewPropertyComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  Form = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    phone_num: new FormControl(''),
    age: new FormControl(''),
    id_doc: new FormControl(''),
    occupation: new FormControl(''),
    view_date: new FormControl(''),
    num_tenants: new FormControl(''),
    num_pets: new FormControl(''),
    ped_desc: new FormControl(''),
    smoke: new FormControl(''),
   
  });

  dob: Date = new Date();
  appForm: Pending = new Pending
  formData = new FormData();
  submitted = false;
  displayApplicationForm: boolean = false;
  firstName: string = '';
  lastName: string = '';
  errorMessage = '';
  file: any;
  btnStatus ="disabled"
  isFormEmpty = false;
  id:any;
  clicked = false;
  token:any = '';
  data:any;
  property:any
  propertyID: any;
  tenantProperty:any


  constructor(
    private auth:AuthenticationService,
    private formBuilder: FormBuilder,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private messageService: MessageService,
    private tenants:TenantsService,
    private service: LandingPageService,
    private confirmationService: ConfirmationService,
  ) { }

  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }

  ngOnInit(): void {
    this.propertyID =  this.activeRoute.snapshot.params['id']
    this.getPropertyByID()
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;
  }

  handleFileInput(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }

  getPropertyByID(){
    this.loading = true
    this.service.getPropertiesByID(this.propertyID).subscribe({
      next: (data: any) => {
        this.property = data;
        this.data = this.property[0]
        this.getRoomImages(this.data.property_id)
      }
    })
  }

  getRoomImages(userID:number){
    this.service.getRoomsImages(userID).subscribe({
      next: (data: any) => {
        this.tenantProperty = data;
        this.loading = false
      }
    })
  }

  onSubmit():void{
    this.submitted = true;

    if(this.Form.invalid){
      return
    }
      let property_ID:any = this.propertyID;
     
      this.formData.append('property_id', property_ID);
      this.formData.append('full_name', this.Form.value.fname + '  '+ this.Form.value.lname)
      this.formData.append('email', this.Form.value.email)
      this.formData.append('phone_num', this.Form.value.phone_num)
      this.formData.append('age', this.Form.value.age)
      this.formData.append('id_doc', this.file)
      this.formData.append('occupation', this.Form.value.occupation)
      this.formData.append('view_date', this.Form.value.view_date)
      this.formData.append('num_tenants', this.Form.value.num_tenants)
      this.formData.append('num_pets', this.Form.value.num_pets)
      this.formData.append('ped_desc', this.Form.value.ped_desc)
      this.formData.append('smoke', this.Form.value.smoke)

      this.tenants.ApplyProperty(this.formData,  this.id).subscribe({
        next:data => {
          this.router.routeReuseStrategy.shouldReuseRoute = ()=> false;
          this.router.onSameUrlNavigation = "reload";
          this.displayApplicationForm = false;
          this.messageService.add({
            key: 'tc', severity:'success', summary: 'Success', detail: "Application Successful", life: 3000
          }); 
        },
        error: (err) =>{
          this.messageService.add({
            key: 'tc', severity:'error', summary: 'Error', detail: "Application Failed", life: 3000
          }); 
        }
      })
    }

    actionMethod(){
    }
  
    showBasicDialog() {
      this.displayApplicationForm = true;
      this.submitted = false;
    }
  
    hideDialog() {
      this.displayApplicationForm = false;
      this.submitted = false;
    }


}
