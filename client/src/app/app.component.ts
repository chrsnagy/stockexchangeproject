import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import './rxjs-operators';
import { StocksService } from './stocks.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StocksService]
})
export class AppComponent implements OnInit {
  isRegistering = false;
  isLoggingIn = false;

  title = 'Stock Market Prices';
  message = '';
  data: any;

  constructor(private http: HttpClient, private router: Router, private stocksService: StocksService) { }

  public stocks = [];
  public stocksHistory = [];

  registerData = { username: '', password: '' };
  loginData = { username:'', password:'' };

  register() {
    this.http.post('/users/register', this.registerData).subscribe(resp => {
      this.router.navigate(['']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  login() {
    this.http.post('/users/login',this.loginData).subscribe(resp => {
      this.data = resp;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['administrator']);
    }, err => {
      this.message = err.error.msg;
    });
  }

  getStocks() {
    console.log('Subscribe to service');
    this.stocksService.getStocks()
      .subscribe(
        data => {
          this.stocks = data;
          console.log(data);
        });
  }

  expand(id) {
    this.stocksHistory.push(id);
  }

  collapse(id) {
    const index = this.stocksHistory.indexOf(id);
    this.stocksHistory.splice(index, 1);
  }

  ngOnInit() {
    this.getStocks();
  }
}
