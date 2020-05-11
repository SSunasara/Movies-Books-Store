import { Cart } from './../../shared/interfaces/cart';
import { CartService } from './../../shared/services/cart.service';
import { Product } from './../../shared/interfaces/product';
import { Component, OnInit, NgModule } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  Products: Product[];
  item: Cart = null;
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
}
