import { Component, OnInit } from '@angular/core';
import { Stock, StockValue } from '../stocksmodel';
import { AdministratorService } from './administrator.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-administrator',
    templateUrl: './administrator.component.html',
    styleUrls: ['./administrator.component.css'],
    providers: [AdministratorService]
})
export class AdministratorComponent implements OnInit {
    title = "Create new stock listing";
    constructor (
        private stockService: AdministratorService,
        private router: Router,
        private formBuilder: FormBuilder
      ) {
          
      }

    ngOnInit() {
    }
}