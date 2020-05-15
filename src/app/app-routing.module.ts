import { Error404Component } from './error404/error404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', loadChildren: ()=> import('./shopping/shopping.module').then(m => m.ShoppingModule)},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
