import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { addOneYearToDate, formatDate } from '../utils/date';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  selectedProduct: Product | null = null;
  productForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200),
    ]),
    logo: new FormControl('', Validators.required),
    date_release: new FormControl('', [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
  });

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.selectedProduct = this.productService.selectedProduct;
    if (this.selectedProduct) {
      this.selectedProduct.date_release = formatDate(
        new Date(this.selectedProduct.date_release)
      );
      this.selectedProduct.date_revision = formatDate(
        new Date(this.selectedProduct.date_revision)
      );
      this.productForm.setValue(this.selectedProduct);
    }
  }

  validateName() {
    return (
      this.productForm.controls.name.valid ||
      this.productForm.controls.name.untouched
    );
  }

  validateId() {
    return (
      this.productForm.controls.id.valid ||
      this.productForm.controls.id.untouched
    );
  }

  validateDescription() {
    return (
      this.productForm.controls.description.valid ||
      this.productForm.controls.description.untouched
    );
  }

  validateLogo() {
    return (
      this.productForm.controls.logo.valid ||
      this.productForm.controls.logo.untouched
    );
  }

  validateReleaseDate() {
    return (
      this.productForm.controls.date_release.valid ||
      this.productForm.controls.date_release.untouched
    );
  }

  saveProduct() {
    if (this.productForm.valid) {
      if (this.selectedProduct) {
        this.productService
          .updateProduct(this.productForm.value as Product)
          .subscribe(() => {
            this.router.navigate(['/products']);
          });
      } else {
        this.productService
          .saveProduct(this.productForm.value as Product)
          .subscribe(() => {
            this.router.navigate(['/products']);
          });
      }
    }
  }

  onDateReleaseChange(releaseDate: string) {
    this.productForm.controls.date_release.setValue(releaseDate);
    const revisionDate = addOneYearToDate(releaseDate);
    this.productForm.controls.date_revision.setValue(formatDate(revisionDate));
  }
}
