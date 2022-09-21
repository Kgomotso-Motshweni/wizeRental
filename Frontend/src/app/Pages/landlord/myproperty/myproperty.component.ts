import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LandlordService } from 'src/app/Services/landlord.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Property } from 'src/app/Interfaces/property';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  myData:any ;
  token:any = '';
  submitted:boolean = false;
  propertyInf:Property = new Property;
  pdfTittle: any;
  houseImage: any;
  formData = new FormData();
  condition:Boolean = false;
  id: number = 0;
  message: any;

  Form = new FormGroup({
    pdf: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder,
    private land:LandlordService, 
    private auth:AuthenticationService,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService,
    private activeroute: ActivatedRoute,
    private route:Router) { }

  ngOnInit(): void {
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    let userid = this.token.regData[0].userid
    this.id = userid;
    this.getProperty(userid);
    this.Form = this.formBuilder.group({
      pdf: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
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
        this.land.deleteMyProperty(details).subscribe({
          next:data =>{
            this.loading = true;
            this.message = data
            //Route back to the current page,  this helps in refreshing data
            this.route.routeReuseStrategy.shouldReuseRoute = ()=> false;
            this.route.onSameUrlNavigation = "reload";
            this.route.navigate(['/landlord/myproperty']);  
            this.loading = false;
            this.messageService.add({severity:'success', summary: 'Successful', detail: this.message.message, life: 3000})
          },error: err => {
            this.loading = false;
            //show the message if unable to add new data
            this.message = err.error.message;
            this.messageService.add({severity:'error', summary: 'Error', detail: this.message, life: 3000}) 
          }
        });
       },
      reject: () => {
        this.loading = false;
        this.messageService.add({severity:'error', summary: 'Error', detail: 'You cancelled property delete', life: 3000})
      }
    })
  }
  
  //Open insert form
  openNew(){
    //pass the datatypes in the modal class from model form/ form
    this.propertyInf = {}
    this.condition = true;
  }

  //hide the Form
  hideInsertform(){
    this.condition = false;
    this.submitted = false;
  }

  //reuse the form for editing 
  editProperty(propertyIn: Property) {
    this.propertyInf = {...propertyIn};
  }

  imageFileInput(event:any){
    const proofOfOwnership = (event.target as any ).files[0];
    this.pdfTittle = proofOfOwnership
  }
  pdfFileInput(event:any){
    const image = (event.target as any ).files[0];
    this.houseImage = image
  }

  SaveMypropert(){
    this.submitted = true;// submit when the details are true/when form is not blank
    /*  code here for submiting form
        refere to the saveemployee function below 
        NB the 1st if statement  was focused on updating and else was inserting new data 
        focus on adding new data
    */
    if(this.Form.invalid)
    { 
      this.loading = false;
      return
    }

    this.formData.append('image', this.houseImage)
    //this.formData.append('pdf', this.pdfTittle)
    console.log(this.formData)
    this.land.postProperty(this.formData, this.id).subscribe();
  }

  /*
    saveEmployee(){
    this.submitted = true;
        
    //Validate if the modal is empty do not submit
    if(!this.empList.first_name && !this.empList.dept_id && 
      !this.empList.last_name && !this.empList.phone_number && !this.empList.salary ){
      this.productDialog = true;
    }

    if (this.empList.emp_id){   
      
      //pass data that needs to be updated as an object to user variable
      let user = {
        phone_number: this.empList.phone_number,
        salary: this.empList.salary,
        dept_id: this.empList.dept_id   
      }

      //Subscribe to a service that uses a patch to update infor
      this.employees.updateEmpDetails(user, this.empList.emp_id).subscribe({
        next:data =>{
          this.loading = true;
          
          //this.route.navigate(['/dash/employees']);

          //Close dialog modal 
          this.productDialog = false;
          //Route back to employees this helps in refreshing data
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;         
          this.route.onSameUrlNavigation = 'reload';         
          this.route.navigate(['/dash/employees'], { relativeTo: this.activeroute });
          //Display a message if successful
          this.loading = false;
          this.messageService.add({severity:'success', summary: 'Success', detail:  'Employee Updated successfully', life: 3000});
        },error: err => {
          this.loading = false;
          
          //display an error message coming from backend if it failed to update
          this.messageService.add({severity:'error', summary: 'Error', detail:  err.error.message, life: 3000});
        }
      });
    }else{
      //pass data that needs to be data will be inserted in a the database as an object to newEmployees variable
      this.disabled = true;
      
      let newEmployees = { 
        first_name: this.empList.first_name,
        last_name: this.empList.last_name,
        email: this.transform(this.empList.first_name) +"."+ this.transform(this.empList.last_name) +"@zoho.com",
        phone_number: this.empList.phone_number,
        salary: this.empList.salary,
        dept_id:this.empList.dept_id,

        //when this function is called pass 
        status:'Former'
      }

      this.employees.addNewEmp(newEmployees).subscribe({
        next:data =>{
          //turn the loader on 
          this.loading = true;
            
          //return back to employees page
          this.route.navigate(['/dash/employees']);
            
          //turn off the modal dialog off 
          this.productDialog = false;
            
          //show the message if successful
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employee Added', life: 3000})
          this.getEmp() 

          //turn the loader off
          this.loading = false;
        },
        error: err => {
          this.loading = false;

          //show the message if unable to add new data
          this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message, life: 3000}) 
        }
      })
    }
  }

  //Transform letters to lowercase
  transform(value:any): string {
    let first = value.toLowerCase();
    return first; 
  }
  */
}
