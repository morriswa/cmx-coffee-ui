import {inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";
import {CartItem} from "../../types/product.type";


@Injectable()
export class ShoppingCartService {
  api = inject(ApiClient);


  _cart: WritableSignal<CartItem[]> = signal([]);


  get cart(): Signal<CartItem[]> {
    return this._cart;
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
