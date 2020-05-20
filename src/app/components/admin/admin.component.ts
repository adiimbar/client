import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/product';
import { UpdateProductsService } from 'src/app/services/update-products.service';
import { UpdateProductDetails } from 'src/app/models/UpdateProductDetails';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  registrationForm: FormGroup;
  products: Iproduct[];
  requiredAlert: string = 'field is required';
  categoryOptions = [
    {name: 'Milk & Eggs', value: 5},
    {name: 'Vegetables & Fruits', value: 6},
    {name: "Meat & Fish", value: 7},
    {name: "Wine & Drinks", value: 9}
  ];

   // Enables getting a reference to the dom element who's named #fileUpload
   @ViewChild("fileUpload", { static: false })
   fileUpload: ElementRef;
 
   public files = [];
   public uploadedImageName;
   public formSwitchValue = "addProduct";
   public productToUpdate = new UpdateProductDetails();

   selected = '9';

  //  holds values for form data binding
   public ordersFormValuesDummy = {
    productName: '',
    productId: 0,
    productPrice: '',
    productImage: '',
    category: ''  
   }
 

  createForm() {
    this.registrationForm = this.fb.group({
      productName: ['', [Validators.required]],
      productId: ['', []],
      // productPrice: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(0)]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productImage: [this.uploadedImageName, [Validators.required]],
      category: ['', [Validators.required]]
    });
}

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private productsService: ProductsService,
    private _updateProductsService: UpdateProductsService) { }


  ngOnInit() {
    this.createForm();

    this._updateProductsService.itemToUpdate$
    .subscribe(
      item => {
        // this.createForm();
        this.productToUpdate = item;
        this.setProductValuesToform(item);
      }
    )
  }

  saveproduct() {

    if(this.registrationForm.valid) {

      this.registrationForm.value.productImage = this.uploadedImageName;  
      let newProduct: Iproduct[] = this.registrationForm.value;
  
      this.productsService
        .addProduct(newProduct)
        .subscribe();  
    }

  }

  updateProduct() {
    console.log('update product was clicked');
    // console.log(this.productToUpdate);
    console.log(this.registrationForm.value);

  }


  setProductValuesToform(product) {
    this.registrationForm.value.productName = product.product_name;
    this.registrationForm.value.productId = product.product_id;
    this.registrationForm.value.productPrice = product.price;
    this.registrationForm.value.productImage = product.image_path;
    this.registrationForm.value.category = product.category_id;
    

    // this.createForm();


    // this.ordersFormValuesDummy = product;
    // this.ordersFormValuesDummy.productName = product.product_name;

  }

  formSwitchButton() {
    if(this.formSwitchValue == 'addProduct') {
      this.formSwitchValue = 'updateProduct';
    } else if(this.formSwitchValue == 'updateProduct') {
      this.formSwitchValue = 'addProduct';
    }
  }

  onClick() {
    // Clearing the files from previous upload
    this.files = [];

    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log("Uploaded file :" + file);
        this.files.push({ name: file.name, data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    let observable = this.uploadService.upload(formData);

    // Updating the view's precentage, based on the size of the current 
    // uploaded block
    observable.pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      }));

    observable.subscribe((event: any) => {
      if (typeof (event) === 'object' && event.body) {
        console.log("Body : " + JSON.stringify(event.body));
        this.uploadedImageName = "http://localhost:3000/uploads/" + event.body.name;
        this.registrationForm.value.productImage = this.uploadedImageName;
        // this.productImagePath = this.uploadedImageName;
        // console.log(this.productImagePath);
        console.log(this.registrationForm.value.productImage);
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';

    console.log("Amount of files to upload : " + this.files.length);
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

}
