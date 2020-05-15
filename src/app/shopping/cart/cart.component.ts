import { UserDetail } from './../../shared/interfaces/user-detail';
import { Component, OnInit} from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: Cart[];
  total: number = 0;
  totalPayable: number = 0;
  dispcartlist: Dispcart[] = [];
  dispcart: Dispcart;
  count = 0;
  deliveryCharge = 0;
  userOTP: number;
  userdetail: UserDetail;

  userForm: FormGroup;
  constructor(
    private cartService: CartService, 
    private productService: ProductService, 
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dispcartlist = [];
    this.total = 0;
    this.count = 0
    this.carts = [];
    this.deliveryCharge = 0;
    this.totalPayable = 0;

    this.userForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)]],
      email:['',[
        Validators.required,
        Validators.email]],
      address: ['', [
        Validators.required,
        Validators.minLength(20)]],
      upiId: [null,
        [Validators.required,
        Validators.pattern('[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}')]]
    });
    localStorage.removeItem('OrderDetails');
    this.getCart();
  }

  get name() {
    return this.userForm.get('name');
  }
  get email() {
    return this.userForm.get('email');
  }
  get address() {
    return this.userForm.get('address');
  }
  get upiId() {
    return this.userForm.get('upiId');
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

  reactive() {
    if (this.count === 0) {
      alert('No Items in Cart');
    }
    else {
      this.userdetail = Object.assign({}, this.userForm.value);
      localStorage.setItem('UserDetails', JSON.stringify(this.userdetail));
      this.router.navigate(['/checkout']);
    }
  }

  // Reset order details
  reset() {
    console.log('reset called');
    this.userForm.reset();
  }

  addQty(item: Dispcart){
    if(item.product.Quantity > 0)
    {
      item.cart.Quantity++;
      this.cartService.updateCart(item.cart).subscribe((res: Cart)=>{
        item.product.Quantity--;
        this.productService.updateProduct(item.product).subscribe(()=>{
          console.log(res);
          this.ngOnInit();
        })        
      })
    }
    else{
      this.toastr.warning('No more Quantity Available!!');
    }
  }
  subQty(item: Dispcart){
    if(item.cart.Quantity > 1)
    {
      item.cart.Quantity--;
      this.cartService.updateCart(item.cart).subscribe((res: Cart)=>{
        item.product.Quantity++;
        this.productService.updateProduct(item.product).subscribe(()=>{
          console.log(res);
          this.ngOnInit();
        })    
      })
    }
    else{
      this.deleteCart(item);
    }
  }

  deleteCart(item: Dispcart){
    item.product.Quantity += item.cart.Quantity;
    console.log(item); 
    this.productService.updateProduct(item.product).subscribe(()=>{
      this.cartService.deleteCart(item.cart.id).subscribe(()=>{
        this.ngOnInit();
        this.toastr.error('Item is Deleted from your Cart!!!')
      });
    })
  }
}
interface Dispcart{
  cart: Cart;
  product: Product;
};
