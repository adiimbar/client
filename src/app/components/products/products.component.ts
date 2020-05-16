// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { Iproduct } from 'src/app/models/product';
import { IcartItem } from 'src/app/models/cart-items';
// import { IdialogData } from 'src/app/models/dialog-data';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { Mock } from 'protractor/built/driverProviders';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Iproduct[];
  cartItem: IcartItem;
  // dialogData: IdialogData;

  // constructor(private productsService: ProductsService, private cartItemsService: CartItemsService, public dialog: MatDialog) { }
  constructor(private productsService: ProductsService, private uploadService: UploadService, public dialog: MatDialog) { }

  // openDialog() {
  //   console.log("dialog opend");
  //   const dialogRef = this.dialog.open(ProductDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  ngOnInit() {
    this.getAllProducts();
    // this.getProductImg();
  }

  getAllProducts(): void {
    this.productsService
      .getAllProducts()
      .subscribe(products => this.products = products);
  }

  // getProductImg() {
  //   // need to get all images and set them in local storage
  // }

  productDialog(product) {
    console.log(product.image_path + 'was clickd');
      this.dialog.open(ProductDialog, {
        data: {
          product_id: product.product_id,
          product_name: product.product_name,
          category_id: product.category_id,
          price: product.price,
          image_path: product.image_path,
        }
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

}


// need to move it to modules folder and import it from there
export interface DialogData {
  product_id: number,
  product_name: string,
  category_id: number,
  price: number,
  image_path: string,
}

@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.html',
  styleUrls: ['./products.component.css']
})
export class ProductDialog {
  // constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {}
  constructor(public dialogRef: MatDialogRef<ProductDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private cartItemsService: CartItemsService) {}

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

    const addCartItemRequestObj = {
      product_id: addedProductData.product_id,
      quantity: Number(this.renderedValue),
      }

    console.log(addCartItemRequestObj);
    this.cartItemsService
      .addCartItem(addCartItemRequestObj)
      // // .addCartItem(newCartItem)
      .subscribe(res => console.log(res));
    // // need to pass the data to the cart table

    this.dialogRef.close();
  }

  cancelButton() {
    // might need to use dialogRef.afterClosed()
    this.dialogRef.close();
  }
}
