import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productForm?: FormGroup;
  errorMessage?: string;
  message?: string;
  productId?: number;
  product: Product;
  constructor(public activatedRoute: ActivatedRoute, public productService: ProductService, public formBuilder: FormBuilder, public router: Router) { }
  ngOnInit(): void {
    this.product = new Product();
    this.productId = this.activatedRoute.snapshot.params['productId'];
    if (this.productId == -1) {
      //save
      this.productForm = this.formBuilder.group({
        productId: ['', [Validators.required, Validators.min(1)]],
        productName: ['', [Validators.required, Validators.minLength(5)]],
        quantityOnHand: ['', [Validators.required]],
        price: ['', [Validators.required]]
      })
    }
    else {
      //edit
      this.productService.getProduct(this.productId)
        .subscribe(data => {
          console.log(data),
            this.product = data
          this.productForm = this.formBuilder.group({
            productId: [this.product.productId, [Validators.required, Validators.min(1)]],
            productName: [this.product.productName, [Validators.required, Validators.minLength(5)]],
            quantityOnHand: [this.product.quantityOnHand, [Validators.required]],
            price: [this.product.price, [Validators.required]]
          })

          //  this.productForm.get('productId').disable();
        },
          error => console.log(error)
        )
    }
  }

  saveProduct() {

    if (this.productId == -1) {
      //save

      this.productService.saveProduct(this.productForm?.value)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate([''])
            console.log("#######Saved successfully ");
            //   this.message = response.message ? response.message : 'This Product added successfully!';
          },
          error => {
            this.errorMessage = "This Product already exists, please try with different id"
            console.log("ERROR in save : " + error);
          });
    }
    else {
      //edit
      this.productService.updateProduct(this.productForm?.value)
        .subscribe(
          response => {
            console.log(response);
            console.log("#######Updated successfully and navigating");
            this.router.navigate([''])
          },
          error => {
            console.log(error);
          });
    }

    /*   this.productService.saveProduct(this.productForm?.value).subscribe(data => {
      }),
        (err: string) => this.errorMessage = err
      console.log(this.productForm?.value)
    } */

  }
}
