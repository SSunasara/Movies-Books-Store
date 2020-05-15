import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

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

  getWishlist(ip: string): Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(this.baseURL + "WishList", this.headerOption).pipe(
      map(data => data.filter(items => items.IpAddress === ip)),
      catchError(this.handleError)
    );
  }

  addToWishlist(item: Wishlist): Observable<Wishlist>{
    return this.http.post<Wishlist>(this.baseURL + "WishList", item, this.headerOption).pipe(
      catchError(this.handleError)
    );
  } 

  deleteWishlist(id: number){
    return this.http.delete<Wishlist>(this.baseURL + "WishList" + `/${id}`, this.headerOption).pipe(      
      catchError(this.handleError)
    );
  }

  getSpecific(ip: string, id: number): Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>(this.baseURL + "WishList", this.headerOption).pipe(
      map(data => data.filter(items => items.ProductId ===id).
      filter(item => item.IpAddress === ip)),
      catchError(this.handleError)
    );
  }
}
