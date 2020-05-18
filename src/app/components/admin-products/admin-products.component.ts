import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/product';
// import { IcartItem } from 'src/app/models/cart-items';
// import { IdialogData } from 'src/app/models/dialog-data';
import { MatDialog } from '@angular/material/dialog';
// import { Mock } from 'protractor/built/driverProviders';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Iproduct[] = [];
  public itemSearchValue: string = '';
  // cartItem: IcartItem;
  categoryOptions = [
    {name: 'All products', value: null},
    {name: 'Milk & Eggs', value: 5},
    {name: 'Vegetables & Fruits', value: 6},
    {name: "Meat & Fish", value: 7},
    {name: "Wine & Drinks", value: 9}
  ];

  constructor(private productsService: ProductsService, private uploadService: UploadService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts();

    this.productsService.needToRefetchSubject.subscribe((value) => {
      if (value) this.getAllProducts();
    })
  }

  async getAllProducts() {
    this.productsService
      .getAllProducts()
      .subscribe(products => this.products = products);
  }

  async getAllProductsByCategoryId(categoryId) {
    this.productsService
      .getAllProductsByCategoryId(categoryId)
      .subscribe(products => this.products = products);
  }

  updateCartButton(product) {
    console.log(product);
  }


  categoryButton(categoryId) {

    if(categoryId == null) {
      this.getAllProducts();
    }
    else {
      this.getAllProductsByCategoryId(categoryId)
    }
  }

  
  searchItemButton() {
    let productName = this.itemSearchValue;

    this.productsService
      .getProductByName(productName)
      .subscribe(products => this.products = products);
  }

}




