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

  items: Product[];
  item: Cart = null;
  ipAddress = '';
  wishlist: Wishlist;
  pageOfItems: Array<any>;
  pageSize = 8;
  p = 1;
  collectionsize;

  ngOnInit(): void {
    this.getProductData();
  }

  onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
  }

  getProductData(){
    this.productService.getProducts().subscribe((res: Product[]) => 
      {
        this.items = res;
        console.log("Result ",this.items);
        this.collectionsize = res.length;
      });
  }

  goToDetails(id: number){
    this.router.navigate([`./details/${id}`]);
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
            prod.Quantity--;
            this.productService.updateProduct(prod).subscribe(()=>{
              this.item=res;
            alert("Item is added to your cart!!!");
            })
            
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

  addToWishlist(id: number){
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;   
      this.wishlistService.getSpecific(this.ipAddress, id).subscribe(res=>{
        if(res.length === 0){
          this.wishlist = {
            id: null,
            ProductId: id,
            IpAddress: this.ipAddress
          }
          console.log(this.wishlist);
          this.wishlistService.addToWishlist(this.wishlist).subscribe((res: Wishlist)=> {
            console.log(res);
            alert("Item is added to your WishList!!!");
          })
        }
        else{
          console.log(res);
          alert("Item already added to wishlist");
        }
      })  
      
    });
    
  }
}
