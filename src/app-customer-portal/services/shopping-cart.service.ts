import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";
import {CartItem} from "../../types/product.type";


@Injectable()
export class ShoppingCartService {
  api = inject(ApiClient);


  _cart: WritableSignal<CartItem[]|undefined> = signal(undefined);
  _cartTotal: Signal<number> = computed(()=>{
    const items = this._cart();
    if (!items) return -1;
    const prices = items.map(item=>item.sale_price*item.quantity);
    let sum = 0;
    for (const price of prices) sum += price;
    return sum;
  })
  _cartItems: Signal<number> = computed(()=>{
    const items = this._cart();
    if (!items) return -1;
    const itemCounts = items.map(item=>item.quantity);
    let sum = 0;
    for (const itemCount of itemCounts) sum += itemCount;
    return sum;
  })

  get cart(): Signal<CartItem[]|undefined> {
    return this._cart;
  }

  get cartTotal(): Signal<number> {
    return this._cartTotal;
  }

  get cartItems(): Signal<number> {
    return this._cartItems;
  }

  addToCart(productId: number) {
    throw new Error('not implemented')
  }

  removeFromCart(productId: number) {
    throw new Error('not implemented')
  }

  updateAmountInCart(productId: number, quantity: number) {
    throw new Error('not implemented')
  }

  createOrder() {
    throw new Error('not implemented')
  }

  async refreshCart() {
    const items = await this.api.getShoppingCart();
    if (items) this._cart.set(items)
  }
}
