import { HttpClient } from '@angular/common/http';
import { WishlistService } from './../../shared/services/wishlist.service';
import { Cart } from './../../shared/interfaces/cart';
import { CartService } from './../../shared/services/cart.service';
import { Product } from './../../shared/interfaces/product';
import { Component, OnInit, NgModule } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { Wishlist } from 'src/app/shared/interfaces/wishlist';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private cartService: CartService,
    private wishlistService: WishlistService,
    private http: HttpClient
  ) { }

  Products: Product[];
  item: Cart = null;
  ipAddress = '';
  wishlist: Wishlist;


  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(){
    this.productService.getProducts().subscribe((res: Product[]) => 
      {
        this.Products = res;
        console.log("Result ",this.Products);
      });
  }

  goToDetails(id: number){
    this.router.navigate([`./details/${id}`]);
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
