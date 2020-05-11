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
  products: Product[] = [];
  total: number = 0;
  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartService.getCarts().subscribe((res: Cart[])=>{
      this.carts = res;
      this.countTotal();
    })
  }

  countTotal() {
    this.carts.forEach(item => {
      this.productService.getDetails(item.id)
        .subscribe(data => {
          this.products.push(data);
          console.log(data);
          this.total = this.total + data.Price;
        });
    });
  }
}
