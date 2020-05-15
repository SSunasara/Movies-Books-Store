import { CartService } from './../../shared/services/cart.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from './../../shared/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { WishlistService } from './../../shared/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/shared/interfaces/wishlist';
import { Cart } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(
    private wishlistService: WishlistService, 
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  wishlist: Wishlist[];
  ipAddress: string;
  dispWishlist: DispWishlist[] = [];
  item: Cart;

  ngOnInit(): void {
    this.wishlist = [];
    this.ipAddress = "";
    this.dispWishlist = [];
    this.item = null;
    this.getIpAddress();
  }

  getWishList(ip: string){
    this.wishlistService.getWishlist(ip).subscribe((res: Wishlist[])=>{
      this.wishlist = res;
      console.log(this.wishlist);
      this.getProduct();
    })
  }

  getProduct(){
    this.wishlist.forEach(item=>{
      this.productService.getDetails(item.ProductId).subscribe((res: Product)=>{
        this.dispWishlist.push({wishlist: item, product: res});
      })
    });
    console.log(this.dispWishlist);
  }

  getIpAddress(){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip; 
      this.getWishList(this.ipAddress);    
    })
  }

  deleteWishlist(id: number){
    this.wishlistService.deleteWishlist(id).subscribe(res =>{
      console.log(res);
      this.ngOnInit();
      alert("Item is Deleted from your wishlist!!!");
    });
  }

  addToCart(prod: Product){
    console.log(prod);
    try{
      this.cartService.getCartItemByProductId(prod.id).subscribe(res => {
        if(res.length === 0){
          this.item = {
            id: null,
            ProductId : prod.id,
            Quantity : 1
          }
          console.log("ToAdd", this.item);
          this.cartService.addToCart(this.item).subscribe((res: Cart)=>{
            this.item=res;
            alert("Item is added to your cart!!!");
          });
        }
        else{
          res[0].Quantity++;
          this.cartService.updateCart(res[0]).subscribe(()=>{
            prod.Quantity--;
            this.productService.updateProduct(prod).subscribe(()=>{
              alert("Quantity Increas");
            })
          })
        }
      })
    }
    catch{
      alert("Something went wrong, try again later")
    }
  }
  
  goToDetails(id: number){
    this.router.navigate([`./details/${id}`]);
  }
}

interface DispWishlist{
  wishlist: Wishlist;
  product: Product;
}
