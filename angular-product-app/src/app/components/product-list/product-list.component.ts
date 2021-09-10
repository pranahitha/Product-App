import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  errorMessage?: string;
  successMessage?: string;
  //
  constructor(public productService: ProductService, public router: Router) { }

  products: Product[] = [];
  ngOnInit(): void {
    this.refreshProducts();
  }

  addProduct() {
    //write the code to navigate -- programmaticallly
    console.log("Add product called")
    this.router.navigate(['addProduct',"-1"]);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe(
        response => {
          console.log(response);
          this.successMessage = productId +" :   successfully deleted"
          console.log("#######Deleted successfully and navigating and refreshing");
          this.refreshProducts();
          this.router.navigate([''])
        },
        error => {
          console.log(error);
        });
  }


  editProduct(productId: number) {
    this.router.navigate(['addProduct',productId])
  }












  refreshProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      console.log("###Products recieved from spring :")
      console.log(data);
      this.products = data;
    }, err => this.errorMessage = err)
  }
}
