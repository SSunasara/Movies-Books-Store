import { UserDetail } from './../../shared/interfaces/user-detail';
import { map } from 'rxjs/operators';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carts: Cart[];
  total: number = 0;
  dispcartlist: Dispcart[] = [];
  dispcart: Dispcart;
  count = 0;
  OTP = 778899;
  userOTP;
  userdetail: UserDetail;

  constructor(
    private cartService: CartService, 
    private productService: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCart();
    this.userdetail = JSON.parse(localStorage.getItem('UserDetails'));
  }

  getCart(){
    this.cartService.getCarts().subscribe((res: Cart[])=>{
      this.carts = res;
      console.log(this.carts)
      this.countTotal();      
      
    })
  }

  countTotal(){
    this.carts.forEach(item => {
      this.productService.getDetails(item.ProductId)
        .subscribe(data => {
          this.dispcart = {
            cart: item,
            product: data
          }
          console.log(this.dispcart);
          this.dispcartlist.push(this.dispcart);
          this.total = this.total + (this.dispcart.cart.Quantity * this.dispcart.product.Price);
          this.count++;         
        });                           
    });   
    
  }

  checkOTP(){
    if(this.OTP === this.userOTP){
      alert("CheckOut Success");
      this.router.navigate(['/']);
    }      
    else
      alert("CheckOut Fail, Wrong OTP");
  }
}
interface Dispcart{
  cart: Cart;
  product: Product;
};
