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
  totalPayable: number = 0;
  dispcartlist: Dispcart[] = [];
  dispcart: Dispcart;
  count = 0;
  deliveryCharge = 0;
  OTP = 778899;
  userOTP: number;

  constructor(
    private cartService: CartService, 
    private productService: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dispcartlist = [];
    this.total = 0;
    this.count = 0
    this.carts = [];
    this.deliveryCharge = 0;
    this.totalPayable = 0;
    this.getCart();
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
          console.log("total" + this.total)          
        });                           
    });   
    
  }

  addQty(item: Dispcart){
    if(item.product.Quantity > item.cart.Quantity)
    {
      item.cart.Quantity++;
      this.cartService.updateCart(item.cart).subscribe((res: Cart)=>{
        console.log(res);
        this.ngOnInit();
      })
    }
  }
  subQty(item: Dispcart){
    if(item.cart.Quantity > 1)
    {
      item.cart.Quantity--;
      this.cartService.updateCart(item.cart).subscribe((res: Cart)=>{
        console.log(res);
        this.ngOnInit();
      })
    }
  }

  checkOTP(){
    if(this.OTP === this.userOTP)
      console.log("Success");
    else
      console.log("Fail");
  }
}
interface Dispcart{
  cart: Cart;
  product: Product;
};
