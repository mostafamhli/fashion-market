import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartsService } from 'src/app/carts/services/carts.service';
import { productData } from '../../product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: any;
  product!: productData;
  productRating!:number
  loader: boolean = false;
  stars:number[]=[]
  emptyStars:number[]=[]
  amount: number = 1;
  cartProducts: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartsService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.loader = true;
    this.productService
      .getProductByID(this.id)
      .subscribe((res: productData) => {
        this.loader = false;
        this.product = res;
        this.productRating = Math.round(res.rating.rate)
        this.stars=Array(this.productRating).fill(1).map((x, i) => i + 1);
        this.emptyStars=Array(5 - this.productRating).fill(1).map((x, i) => i + 1);
      });
  }

  addAmount() {
    this.amount += 1;
  }

  minsAmount() {
    if (+this.amount > 1) {
      this.amount -= 1;
    }
  }

  addToCart(event: productData) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exists = this.cartProducts.find((item) => item.item.id === event.id);
      if (exists) {
        alert('Item already exists in cart');
      } else {
        this.cartProducts.push({item: event, quantity: this.amount});
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push({item: event, quantity: this.amount});
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
    this.cartService.raiseDateEmitterEvent(true)
  }
}
