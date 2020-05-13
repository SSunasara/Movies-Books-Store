import { WishlistService } from './../../shared/services/wishlist.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from './../../shared/services/cart.service';
import { Cart } from './../../shared/interfaces/cart';
import { Product } from './../../shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Wishlist } from 'src/app/shared/interfaces/wishlist';

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.scss']
})
export class DetalsComponent implements OnInit {

  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService,
    private wishlistService: WishlistService,
    private http: HttpClient
    ) { }
    
  id: number;
  details: Product;
  item: Cart;
  ipAddress = '';
  wishlist: Wishlist;
  ngOnInit(): void {
    this.getId();
    this.getDetails(this.id);
  }

  getId() {
    // tslint:disable-next-line: radix
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getDetails(id: number) {
    this.productService.getDetails(id)
      .subscribe(data => {
        this.details = data;
        console.log(this.details);
      });
  }

  addToCart(id: number){
    this.item = {
      id: null,
      ProductId : id,
      Quantity : 1
    }
    console.log("ToAdd", this.item);
    this.cartService.addToCart(this.item).subscribe((res: Cart)=>{
      this.item=res;
    });
  }

  addToWishlist(id: number){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;     
      this.wishlist = {
        id: null,
        ProductId: id,
        IpAddress: this.ipAddress
      }
      console.log(this.wishlist);
      this.wishlistService.addToWishlist(this.wishlist).subscribe((res: Wishlist)=> {
        console.log(res);
      })
    });
    
  }
}
