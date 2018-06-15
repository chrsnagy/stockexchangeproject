import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';

const routes: Routes = [
  // {
  //   path: 'administrator',
  //   component: AdministratorComponent,
  //   data: { title: 'Administrator Panel' }
  // },
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class MEAN2RoutingModule { }
