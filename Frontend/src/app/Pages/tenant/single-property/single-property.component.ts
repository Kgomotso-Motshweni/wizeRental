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
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.scss']
})
export class SinglePropertyComponent implements OnInit {

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
    private confirmationService: ConfirmationService,) { }

   //select a file
  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0]; 
  }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
    
    this.propertyID =  this.activeRoute.snapshot.params['id']
    
    this.Form = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_num:  ['', [Validators.required, Validators.maxLength(12)]],
      age: ['', Validators.required],
      id_doc: ['', Validators.required],
      occupation: ['', Validators.required],
      view_date: ['', Validators.required],
      num_tenants: ['', Validators.required],
      num_pets: ['', Validators.required],
      ped_desc: ['', Validators.required],
      smoke: ['', Validators.required],
    },
    );
    this.getPropertyByID()
  }
    //it traps errors in the form
  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;
  }

   //upload proccess for a file
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

  // submit when the details are true/when form is not blank
  onSubmit():void{
    this.submitted = true;

    if(this.Form.invalid){
      return
    }
    
    //property id number
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

  //disable button after applying
  actionMethod(){
  }

  //shows application form after clicking apply button
  showBasicDialog() {
    this.displayApplicationForm = true;
    this.submitted = false;
  }


  //hide application form
  hideDialog() {
    this.displayApplicationForm = false;
    this.submitted = false;
  }
}
