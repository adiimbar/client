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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css', '../../styles/childStyle.css']
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

   @ViewChild("fileUpload", { static: false })
   fileUpload: ElementRef;
 
   public files = [];
   public uploadedImageName;
   public formSwitchValue = "addProduct";
   public formUpdateConditionValue: boolean = false;
   public productToUpdate = new UpdateProductDetails();


  createForm() {
    this.registrationForm = this.fb.group({
      productName: ['', [Validators.required]],
      productId: ['', []],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productImage: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
}

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private productsService: ProductsService,
    private _updateProductsService: UpdateProductsService,
    private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.createForm();

    this._updateProductsService.itemToUpdate$
    .subscribe(
      item => {
        if(this.formSwitchValue === 'addProduct') {
          this.updateProductSwitchButton();
        }
        // this.createForm();
        this.productToUpdate = item;
        this.setProductValuesToform(item);
      }
    )
  }

  saveproduct() {

    if(this.registrationForm.value.productName && this.registrationForm.value.productPrice && this.uploadedImageName && this.registrationForm.value.category) {

      this.registrationForm.value.productImage = this.uploadedImageName;  
      let newProduct: Iproduct[] = this.registrationForm.value;
  
      this.productsService
        .addProduct(newProduct)
        .subscribe();
      
      this.openSnackBar('Item added', 'Dismiss');
    }

  }

  updateProduct() {
    if(this.registrationForm.value.productName && this.registrationForm.value.productPrice && this.productToUpdate.product_id) {

      this.registrationForm.value.productId = this.productToUpdate.product_id;

      let newProduct: Iproduct[] = this.registrationForm.value;

      this.productsService
        .updateProduct(newProduct)
        .subscribe(res => {
          console.log('update response');
          console.log(res);
        });

      this.openSnackBar('Item updated', 'Dismiss');

    }

  }

  setProductValuesToform(product) {
    this.registrationForm.value.productName = product.product_name;
    this.registrationForm.value.productId = product.product_id;
    this.registrationForm.value.productPrice = product.price;
    this.registrationForm.value.productImage = product.image_path;
    this.registrationForm.value.category = product.category_id;
  }

  addProductSwitchButton() {
    this.formSwitchValue = 'addProduct';
    this.createForm();

  }

  updateProductSwitchButton() {
    this.formSwitchValue = 'updateProduct';
    this.formUpdateConditionValue = false;
    this.createForm();
  }

  updateImageAndCategorySwitchConditionButton() {
    this.formUpdateConditionValue = true;
  }

  openSnackBar(message, action) {
    this._snackBar.open(message, action, {duration: 1000});
  }

  onClick() {
    // Clearing the files from previous upload
    this.files = [];

    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        // console.log("Uploaded file :" + file);
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
        // console.log("Body : " + JSON.stringify(event.body));
        this.uploadedImageName = "http://localhost:3000/uploads/" + event.body.name;
        this.registrationForm.value.productImage = this.uploadedImageName;
        // this.productImagePath = this.uploadedImageName;
        // console.log(this.productImagePath);
        // console.log(this.registrationForm.value.productImage);
      }
    });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';

    // console.log("Amount of files to upload : " + this.files.length);
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

}
