import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alstrom-product-app';

  constructor(public router:Router){

  }
  gotoHome(){
    this.router.navigate(['']);
  }
  gotoAddProduct(){
    this.router.navigate(['addProduct',"-1"]);
  }
 
  gotoListProduct(){
    this.router.navigate(['']);
  }
}
