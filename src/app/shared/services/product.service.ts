import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http : HttpClient) { }

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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL + "Products", this.headerOption).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getDetails(id): Observable<Product>{
    return this.http.get<Product>(this.baseURL + "Products" + `/${id}`, this.headerOption).pipe(
      tap(),
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/products`, this.headerOption).pipe(
      map(data => data.filter(items => items.Category === 'Movie'))
    );
  }

  getAllBooks(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}/products`, this.headerOption).pipe(
      map(data => data.filter(items => items.Category === 'Book'))
    );
  }
}
