import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { elementAt, of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { LandlordService } from 'src/app/Services/landlord.service';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss'],
  providers: [MessageService]
})
export class AddpropertyComponent implements OnInit {

  Form = new FormGroup({
    address: new FormControl(''),
    town: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
    options: new FormControl(''),
    accomName: new FormControl(''),
    description: new FormControl(''),
    numBeds: new FormControl(''),
    numBaths: new FormControl(''),
    numRooms: new FormControl(''),
    price: new FormControl(''),
    petFriendly: new FormControl(''),
    houseImage: new FormControl(''),
    tittleDeed: new FormControl(''),
  });

  submitted:boolean = false; 
  message: any;
  file: any;
  pdf: any;
  formData = new FormData();
  RoomImmages = new FormData();
  gallery: Array<any> = [];
  preview: Array<any> = [];
  userinfor:any
  token:any = '';
  id:number = 0;
  img:any;
  exist:boolean = false;
  position:number = 0;
  previewVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private ngWizardService: NgWizardService, 
    private land:LandlordService,
    private messageService: MessageService,
    private auth:AuthenticationService,
    private router:Router, 
    private __loader: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.__loader.start();
    //returns a decoded token
    this.token = this.auth.getDecodedAccessToken(localStorage.getItem('access_token'))
    this.id = this.token.regData[0].userid;
    this.Form = this.formBuilder.group({
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      options: ['', Validators.required],
      accomName: ['', Validators.required],
      description: ['', Validators.required],
      numBeds: ['', Validators.required],
      numBaths: ['', Validators.required],
      numRooms: ['', Validators.required],
      price: ['', Validators.required],
      petFriendly: ['', Validators.required],
      houseImage: ['', Validators.required],
      tittleDeed: ['', Validators.required],
    }
    );
    this.__loader.stop();
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };


  // The ng-wizard tabs
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showPreviousButton: false,
      showNextButton: false,
    }
  };
  

  showPreviousStep() 
  {
    this.ngWizardService.previous();
  }

  // Allows submission if the form is valid
  showNextStep() 
  {
    this.submitted = true;
    // if(this.Form.invalid){
    //   return
    // }
    this.ngWizardService.next();
  }

  setTheme(theme: THEME) 
  {
    this.ngWizardService.theme(theme);
  }
  stepChanged(args: StepChangedArgs) 
  {
  }

  // 	Validation for transition from step
  isValidTypeBoolean: boolean = true;
  isValidFunctionReturnsBoolean(args: StepValidationArgs) 
  {
    return true;
  }
  isValidFunctionReturnsObservable(args: StepValidationArgs) 
  {
    return of(true);
  }
 
  houseImage(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }
  proofOfOnwership(event:any) {
    const image = (event.target as any ).files[0];
    this.pdf = image
  }

  
   index = 0;
  roomsImages(event:any) {  
    //get the images from html and target the file you just uploaded   
    const image = (event.target as any ).files[0];
      
    if (!this.gallery.some(element => element.name == image.name)) {
      this.gallery.push(image)
      //Show image preview
      let reader = new FileReader();
      reader.onload = (event: any) => {

        this.preview.push(event.target.result);
      }
      reader.readAsDataURL(image);  
     
    }else{
      this.messageService.add({
        key: 'tc', severity:'error', summary: 'Error', detail: "Image Already Added", life: 3000
      });
    } 

  }

  // Submits the form  
  OnSubmit(){
    this.submitted = true;
    this.__loader.start();
    if(this.Form.invalid){
      return
    }
    //when dealing with pictures send the data through a formData
    //append all the form values to formdata, send formdata to backend containing all your form data 
    this.formData.append('p_address', this.Form.value.address)
    this.formData.append('p_town', this.Form.value.town)
    this.formData.append('p_city', this.Form.value.city)
    this.formData.append('p_zip_code', this.Form.value.zipCode)
    this.formData.append('p_propertyType', this.Form.value.options)
    this.formData.append('p_name', this.Form.value.accomName)
    this.formData.append('p_description', this.Form.value.description)
    this.formData.append('p_bedroom', this.Form.value.numBeds)
    this.formData.append('p_bath', this.Form.value.numBaths)
    this.formData.append('p_room', this.Form.value.numRooms)
    this.formData.append('p_price', this.Form.value.price)
    this.formData.append('pet_friendly', this.Form.value.petFriendly)
    this.formData.append('image', this.file)
    this.formData.append('pdf', this.pdf)

    //Subscribe to add new property details
  
    this.land.postProperty(this.formData, this.id).subscribe({
      next:data => {
       
        this.userinfor = data;
        
        //Subscribe to add new property room pictures
        for(let i=0; i< this.gallery.length; i++){
          //assign room images to roomImages formdata from a list
          this.RoomImmages.append('image', this.gallery[i])
        }
        this.land.AddRooms(this.RoomImmages, this.userinfor.results).subscribe() 
        this.messageService.add({
          key: 'tc', severity:'success', summary: 'Success', detail: "Property Successfully Added", life: 3000
        }); 
        this.router.navigate(['/landlord/myproperty'])
      }
    })
    this.__loader.stop();
  }

  //Removes a picture from preview and gallery 
  removeImage(data:any){
    //finds the position of a picture
    let post = this.preview.indexOf(data)    
    this.preview.splice(post,1)
    this.gallery.splice(post,1)
  }

  //redirect to this page if a tenant his application has been declined
  declined(){
    this.router.navigate(['/landlord/myproperty'])
  }
}