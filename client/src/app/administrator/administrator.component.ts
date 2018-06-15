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
    stockValue = new StockValue("", "");
    model = new Stock('', new Array<StockValue>());

    public stocks = [];
    valueForm;
    newValue = [];

    constructor(
        private stockService: StocksService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.createValueForm();
    }

    logout() {
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/']);
    }

    createValueForm() {
        this.valueForm = this.formBuilder.group({
            value: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(200)
            ])]
        });
    }

    getStocks() {
        this.stockService.getStocks()
            .subscribe(
                data => {
                    this.stocks = data;
                    console.log(data);
                });
    }

    submitStock() {
        this.stockService.addStock(this.model)
            .subscribe(
                data => {
                    this.model = data.Stock;
                },
                error => console.log(error, 'Error while submitting stock!')
            );
    }

    submitValue(id) {
        const value = this.valueForm.get('value').value;
        this.stockService.addValue(id, value)
            .subscribe(data => {
                const index = this.newValue.indexOf(id);
                this.newValue.splice(index, 1);
            },
                error => console.log(error, 'Error while submitting stock value!')
            );
    }

    removeStock(id) {
        this.stockService.removeStock(id)
            .subscribe(data => { },
                error => console.log(error, 'Error while removing stock!')
            );
    }



    ngOnInit() {
        //if (localStorage.getItem('jwtToken') != null) {
            this.getStocks();
        //} else {
           // this.router.navigate(['home']);
        //}
    }
}