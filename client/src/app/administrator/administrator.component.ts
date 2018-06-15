import { Component, OnInit } from '@angular/core';
import { Stock, StockValue } from '../stocksmodel';
import { StocksService } from '../stocks.service';
import { Router } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-administrator',
    templateUrl: './administrator.component.html',
    styleUrls: ['./administrator.component.css'],
    providers: [StocksService]
})
export class AdministratorComponent implements OnInit {
    title = "Create new stock listing";
    constructor (
        private stockService: StocksService,
        private router: Router,
        private formBuilder: FormBuilder
      ) {
          
      }

    ngOnInit() {
    }
}