import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
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
    date_release: new FormControl('', Validators.required),
    date_revision: new FormControl('', Validators.required),
  });
  constructor(private productService: ProductService, private router: Router) {}

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

  saveProduct() {
    if (this.productForm.valid) {
      this.productService.products.push(this.productForm.value as Product);
      this.router.navigate(['products']);
    }
  }

  onDateRevisionChange() {
    const formattedValue = this.formatDateText(
      this.productForm.controls.date_revision.value ?? ''
    );
    this.productForm.controls.date_revision.setValue(formattedValue);
  }

  onDateReleaseChange() {
    const formattedValue = this.formatDateText(
      this.productForm.controls.date_release.value ?? ''
    );
    this.productForm.controls.date_release.setValue(formattedValue);
  }

  formatDateText(value: string): string {
    const sanitizedValue = value?.replace(/\D/g, '') ?? '';
    let formattedValue = '';
    if (sanitizedValue.length >= 5) {
      formattedValue =
        sanitizedValue.slice(0, 2) +
        '/' +
        sanitizedValue.slice(2, 4) +
        '/' +
        sanitizedValue.slice(4);
    } else if (sanitizedValue.length >= 3) {
      formattedValue =
        sanitizedValue.slice(0, 2) + '/' + sanitizedValue.slice(2);
    } else {
      formattedValue = sanitizedValue;
    }
    return formattedValue;
  }
}
