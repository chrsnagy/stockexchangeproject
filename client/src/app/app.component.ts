import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import './rxjs-operators';
import { BlogService } from './blog.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BlogService]
})
export class AppComponent implements OnInit {
  isRegistering = false;
  isLoggingIn = false;

  title = 'Stock Market Prices';
  message = '';
  data: any;

  constructor(private blogService: BlogService, private http: HttpClient, private router: Router) { }

  registerData = { username: '', password: '' };
  loginData = { username:'', password:'' };

  register() {
    this.http.post('/users/register', this.registerData).subscribe(resp => {
      this.router.navigate(['/']);
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

  // submitBlog() {
  //   this.blogService.addBlog(this.model)
  //     .subscribe(
  //       blogMsg => {
  //         // console.log("Messages:", messages);
  //         this.model = blogMsg;
  //         // this.getBlogs();
  //       },
  //       error =>  this.title = <any>error
  //     );
  // }

  // getBlogs() {
  //   console.log('Subscribe to service');
  //   this.blogService.getBlogs()
  //     .subscribe(
  //       messages => {
  //         // console.log("Messages:",messages);
  //         this.blogMessages = messages;
  //       },
  //       error =>  this.title = <any>error
  //     );
  // }

  ngOnInit() {
    //this.getBlogs();
  }
}
