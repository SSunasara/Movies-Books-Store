import { catchError } from 'rxjs/operators';
import { Cart } from './../interfaces/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  headerOption = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  private handleError(error: any) {
    console.error(`%c Error occured ${error}`, 'color: red');
    return throwError(error);
  }
  
  baseURL = 'http://localhost:3000/';

  getCarts(): Observable<Cart[]>{
    return this.http.get<Cart[]>(this.baseURL + "Cart", this.headerOption).pipe(
      catchError(this.handleError)
    );
  }

  addToCart(item: Cart): Observable<Cart>{
    return this.http.post<Cart>(this.baseURL + "Cart", item, this.headerOption).pipe(
      catchError(this.handleError)
    );
  } 
}
