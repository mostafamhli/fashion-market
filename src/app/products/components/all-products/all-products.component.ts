import { CartsService } from 'src/app/carts/services/carts.service';
import { Component, OnInit } from '@angular/core';
import { productData } from '../../product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})

export class AllProductsComponent implements OnInit {
  products!: productData[];
  categories!: string[];
  loader: boolean = false;
  cartProducts: any[] = [];

  constructor(private productService: ProductsService,private cartService:CartsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loader = true;
    this.productService.getAllProducts().subscribe((res: productData[]) => {
      this.products = res.filter((item) => {
        return item.category !== 'electronics'  ;
      });
      this.loader = false;
    });
  }

  getCategories() {
    this.loader = true;
    this.productService.getAllCategories().subscribe((res: string[]) => {
      this.categories = res.splice(1);
      this.loader = false;
    });
  }

  filterCategory(e: any) {
    let value = e.target.innerHTML.toLowerCase();
    value === 'all' ? this.getProducts() : this.getProductsByCategory(value);
  }

  getProductsByCategory(category: string) {
    this.loader = true;
    this.productService
      .getProductsByCategory(category)
      .subscribe((res: productData[]) => {
        this.products = res;
        this.loader = false;
      });
  }

  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let exists = this.cartProducts.find(
        (item) => item.item.id === event.item.id
      );
      if (exists) {
        alert('Item already exists in cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
    this.cartService.raiseDateEmitterEvent(true)
  }

}
