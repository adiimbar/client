import { Component, OnInit } from '@angular/core';
import { StoreDetailsService } from 'src/app/services/store-details.service';
import { StoreDetails } from 'src/app/models/storeDetails';


@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {

  constructor(private storeDetailsService: StoreDetailsService) { }

  // storeDetails: StoreDetails;
  storeDetails: any;

  ngOnInit(): void {
    this.getStoreDetails();
  }

  getStoreDetails() {
    this.storeDetailsService
      .getStoreDetails()
      .subscribe(detail => this.storeDetails = detail);
  }

}
