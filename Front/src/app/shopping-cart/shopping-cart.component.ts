// shopping-cart.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  items: { name: string; price: number }[] = [];
  totalItems: number = 0;
  subtotal: number = 0;
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      itemPrice: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  addItem(): void {
    const itemName = this.itemForm.get('itemName')?.value;
    const itemPrice = this.itemForm.get('itemPrice')?.value;

    if (itemName && itemPrice) {
      const newItem = { name: itemName, price: itemPrice };
      this.items.push(newItem);
      this.updateCart();
      this.itemForm.reset();
    }
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
    this.updateCart();
  }

  private updateCart(): void {
    this.totalItems = this.items.length;
    this.subtotal = this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
