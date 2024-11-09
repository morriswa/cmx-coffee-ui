import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";


@Injectable()
export class ShoppingCartService {
  api = inject(ApiClient);


  _cart: WritableSignal<any[]> = signal([]);


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
}
