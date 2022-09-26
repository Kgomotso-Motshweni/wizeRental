import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxLoadingComponent, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';


@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.scss']
})
export class AddpropertyComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  

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
  preview: string = '';
  message: any;
  file: any;
  formData = new FormData();

  constructor(private formBuilder: FormBuilder, ) {

  }

  ngOnInit(): void {
    this.loading = false;
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
  }

  get f():{ [key: string]: AbstractControl }{
    return this.Form.controls;//it traps errors in the form
  }

  houseImage(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }


  proofOfOnwership(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image
  }

  OnSubmit(){
    this.submitted = true;
    if(this.Form.invalid){
      return
    }
  }

  fileList: NzUploadFile[] = []


  previewImage: string = '';
  previewVisible = false;

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  index = 0;

  onIndexChange(event: number): void {
    this.index = event;
  }

  pre(): void {
    this.index  -= 1;
  }

  next(): void {
    this.index +=1;
  }

  done(): void {

    console.log('done');
  }
}