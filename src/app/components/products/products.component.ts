import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Iproduct } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // private productsService: ProductsService;

  // public products = [];

  products: Iproduct[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    // this.products = this.productsService.getAllProducts();

    this.getAllProducts();
    // this.productsService.getAllProducts()
    //   .subscribe(products => this.products = products);
  }

  getAllProducts(): void {
    this.productsService.getAllProducts()
    .subscribe(products => this.products = products);
  }

}
