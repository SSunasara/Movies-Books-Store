import { CartService } from './../../shared/services/cart.service';
import { Cart } from './../../shared/interfaces/cart';
import { Product } from './../../shared/interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detals',
  templateUrl: './detals.component.html',
  styleUrls: ['./detals.component.scss']
})
export class DetalsComponent implements OnInit {

  constructor(
    private productService: ProductService, 
    private activatedRoute: ActivatedRoute, 
    private cartService: CartService
    ) { }
    
  id: number;
  details: Product;
  item: Cart;
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
}
