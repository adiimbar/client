import { Component, OnInit } from '@angular/core';

// import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css', '../../styles/mainLayout.css']
})
export class MainPanelComponent implements OnInit {

  constructor() { }
    // MOCK
    userType = 'CUSTOMER';
    // userType = 'ADMIN';

  // options: FormGroup;

  // constructor(fb: FormBuilder) {
  //   this.options = fb.group({
  //     fixed: false,
  //   });

  // }

 

  ngOnInit(): void {
    // need to determine - userType
    // at load out set it to CUTOMER (hard coded)
    // and set it in the onInit 
  }

}
