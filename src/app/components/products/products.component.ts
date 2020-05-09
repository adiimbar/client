// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/product';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // private productsService: ProductsService;

  // public products = [];

  products: Iproduct[];

  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  // openDialog() {
  //   console.log("dialog opend");
  //   const dialogRef = this.dialog.open(ProductDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }


  ngOnInit() {

    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts()
    .subscribe(products => this.products = products);
  }

  productDialog(product) {
    console.log(product.image_path + 'was clickd');
      this.dialog.open(ProductDialog, {
        data: {
          product_id: product.product_id,
          product_name: product.product_name,
          category_id: product.category_id,
          price: product.price,
          image_path: product.image_path,
          // animal: 'panda'
        }
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}



export interface DialogData {
  product_id: number,
  product_name: string,
  category_id: number,
  price: number,
  image_path: string,


  // animal: 'panda' | 'unicorn' | 'lion';


}

@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.html',
  styleUrls: ['./products.component.css']
})
export class ProductDialog {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {}


  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


    // parameters for product quantity
  initialValue: number = 1;
  step: number = 1;
  min: number = 0;
  max: number = 42;
  // @Input() symbol: string;
  // @Input() ariaLabelLess: string;
  // @Input() ariaLabelMore: string;
  renderedValue: string;
  value: number = 0;

  ngOnInit() {
    this.value = this.initialValue
    this.renderedValue = this.value.toString();
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString();
    }
  };

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString();
    }
  };

  addToCart(addedProductData) {
    console.log('add to cart was clicked');
    console.log(addedProductData);
    console.log('quantity taken from the component: ' + this.renderedValue);


    // need to call a function that will set all the cart items in local storage
  }

  cancelButton() {
    this.dialogRef.close();
  }
}
