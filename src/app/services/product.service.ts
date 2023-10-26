import { Injectable, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit {
  selectedProduct: Product | null = null;

  products: Product[] = [];

  httpOptions = {
    headers: new HttpHeaders({ authorId: 100 }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(environment.apiUrl + '/bp/products', this.httpOptions)
      .pipe(catchError(this.handleError<Product[]>('getHeroes', [])));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(
        environment.apiUrl + '/bp/products',
        product,
        this.httpOptions
      )
      .pipe(
        tap((product: Product) =>
          console.log(`added product w/ id=${product.id}`)
        ),
        catchError(this.handleError<Product>('addProduct'))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(
        environment.apiUrl + '/bp/products',
        product,
        this.httpOptions
      )
      .pipe(
        tap(() =>
          console.log(`updated product w/ id=${this.selectedProduct?.id}`)
        ),
        catchError(this.handleError<Product>('updateProduct'))
      );
  }

  deleteProduct() {
    const url = `${environment.apiUrl}/bp/products?id=${this.selectedProduct?.id}`;

    return this.http.delete<string>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted hero`)),
      catchError(this.handleError<string>('deleteHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
