import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from './../../shared/interfaces/product';
import { Cart } from './../../shared/interfaces/cart';
import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: Cart[];
  dispcartlist: Dispcart[] = [];
  dispcart: Dispcart;
  constructor(
    private cartService: CartService, 
    private productService: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carts = [];
    this.dispcartlist = [];
    this.getCart();
  }

  getCart(){
    this.cartService.getCarts().subscribe((res: Cart[])=>{
      this.carts = res;
      console.log(this.carts)
      this.countTotal();
    })
  }

  deleteCart(id: number){
    this.cartService.deleteCart(id).subscribe(data => {
      console.log(data);            
      this.ngOnInit();
    });
    
  }

  countTotal() {
    this.carts.forEach(item => {
      this.productService.getDetails(item.ProductId)
        .subscribe(data => {
          this.dispcart = {
            cart: item,
            product: data
          }
          console.log(this.dispcart);
          this.dispcartlist.push(this.dispcart);
        });
    });
  }
}
interface Dispcart{
  cart: Cart;
  product: Product;
};
