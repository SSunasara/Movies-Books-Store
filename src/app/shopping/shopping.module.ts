import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './../shared/services/product.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetalsComponent } from './detals/detals.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    ShoppingComponent, 
    CatalogComponent, 
    NavbarComponent, 
    DetalsComponent, 
    CartComponent, 
    WishlistComponent, 
    CheckoutComponent,    
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers:[
    ProductService
  ]
})
export class ShoppingModule { }
