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
  products: Product[] = [
    // {
    //   id: 'wzxRhnAq0W',
    //   name: 'Tarjetas de credito 1',
    //   description: 'Tarjeta de consumo bajo la modalidad de credito',
    //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    //   date_release: '2022-11-15T00:00:00.000+00:00',
    //   date_revision: '2023-11-15T00:00:00.000+00:00',
    // },
    // {
    //   id: 'wzxRhnAq1W',
    //   name: 'Tarjetas de credito',
    //   description: 'Tarjeta de consumo bajo la modalidad de credito',
    //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    //   date_release: '2023-02-01T00:00:00.000+00:00',
    //   date_revision: '2024-02-01T00:00:00.000+00:00',
    // },
    // {
    //   id: 'wzxRhnAq2W',
    //   name: 'Tarjetas de credito',
    //   description: 'Tarjeta de consumo bajo la modalidad de credito',
    //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    //   date_release: '2023-02-01T00:00:00.000+00:00',
    //   date_revision: '2024-02-01T00:00:00.000+00:00',
    // },
    // {
    //   id: 'wzxRhnAq3W',
    //   name: 'Tarjetas de credito',
    //   description: 'Tarjeta de consumo bajo la modalidad de credito',
    //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    //   date_release: '2023-02-01T00:00:00.000+00:00',
    //   date_revision: '2024-02-01T00:00:00.000+00:00',
    // },
    // {
    //   id: 'wzxRhnAq4W',
    //   name: 'Tarjetas de credito',
    //   description: 'Tarjeta de consumo bajo la modalidad de credito',
    //   logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    //   date_release: '2023-02-01T00:00:00.000+00:00',
    //   date_revision: '2024-02-01T00:00:00.000+00:00',
    // },
  ];

  httpOptions = {
    headers: new HttpHeaders({ authorId: 333 }),
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
