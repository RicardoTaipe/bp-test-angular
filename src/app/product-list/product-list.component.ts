import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  visibleProducts: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.visibleProducts = data;
    });
  }

  search(term: string): void {
    if (this.products) {
      const matchingProducts = this.products.filter(
        (product) =>
          product.name.toLocaleLowerCase().indexOf(term) > -1 ||
          product.description.toLocaleLowerCase().indexOf(term) > -1
      );
      this.visibleProducts = matchingProducts;
    }
  }
}
