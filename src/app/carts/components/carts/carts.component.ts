import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  amount: number = 0;
  toastClose: boolean = false;

  constructor(private cartService: CartsService, private route: Router) {}
  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      this.getCartTotal();
    }
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  minsAmount(index: number) {
    if (+this.cartProducts[index].quantity > 1) {
      this.cartProducts[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getCartTotal();
    }
  }

  detectChange(event: any, index: number) {
    if (event.target.value < 1) {
      event.target.value = 1;
      this.cartProducts[index].quantity = 1;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.getCartTotal();
    }
  }

  delete(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
  }

  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  clearCart() {
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.cartService.raiseDateEmitterEvent(false);
    this.getCartTotal();
    this.success = false;
  }

  order() {
    let products = this.cartProducts.map((item) => {
      return {
        productId: item.item.id,
        quantity: item.quantity,
      };
    });
    let model = {
      userId: 5,
      date: new Date(),
      products: products,
    };
    this.cartService.createNewCart(model).subscribe(
      (res) => {
        this.success = true;
        localStorage.setItem('cart', JSON.stringify([]));
      },
      (error) => {
        console.log(error);
        this.success = false;
      }
    );
    this.cartService.raiseDateEmitterEvent(false);
  }

  backToProductsPage() {
    this.route.navigate(['/products']);
  }

  closeToast() {
    this.toastClose = true;
    this.cartProducts = [];
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotal();
    this.success = false;
    this.route.navigate(['/products']);
  }
}
