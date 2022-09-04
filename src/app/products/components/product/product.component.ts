import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productData } from '../../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() data!: productData;
  @Output() item = new EventEmitter();
  addButton: boolean = false;
  amount: number = 1;
  constructor() {}

  ngOnInit(): void {}

  add() {
    this.item.emit({ item: this.data, quantity: this.amount });
  }
}
