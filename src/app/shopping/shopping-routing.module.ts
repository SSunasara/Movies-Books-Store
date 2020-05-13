import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { DetalsComponent } from './detals/detals.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingComponent } from './shopping.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [
      {path: '', component: CatalogComponent},
      {path: 'details/:id', component: DetalsComponent},
      {path: 'cart', component: CartComponent},
      {path: 'wishlist', component: WishlistComponent},
      {path: 'checkout', component: CheckoutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
