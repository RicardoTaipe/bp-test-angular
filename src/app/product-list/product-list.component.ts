import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  isVisible: boolean = false;
  products: Product[] = [];
  visibleProducts: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.visibleProducts = data;
    });
    this.productService.selectedProduct = null;
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

  editProduct(product: Product) {
    this.productService.selectedProduct = product;
    this.router.navigate(['/products/form']);
  }

  deleteProduct(product: Product) {
    this.productService.selectedProduct = product;
    this.isVisible = true;
  }

  showModal(onAnctionSelected: boolean) {
    if (onAnctionSelected) {
      this.productService.deleteProduct().subscribe(() => {
        this.visibleProducts = this.visibleProducts.filter(
          (p) => p !== this.productService.selectedProduct
        );
      });
    } else {
      this.productService.selectedProduct = null;
    }

    this.isVisible = false;
  }

  getProductName() {
    return this.productService.selectedProduct?.name ?? '';
  }
}
