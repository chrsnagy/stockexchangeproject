import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {  HttpClientModule } from '@angular/common/http';
import { AdministratorComponent } from './administrator/administrator.component';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: 'administrator',
    component: AdministratorComponent,
    data: { title: 'Administrator Panel' }
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: '',
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdministratorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
