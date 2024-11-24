import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {ApiClient} from "src/services/api-client.service";
import {CartItem} from "src/types/product.type";
import {CustomerPayment} from "src/types/customer.type";


@Injectable()
export class ShoppingCartService {

  // dependencies
  api = inject(ApiClient);


  // private state
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
  _paymentMethods: WritableSignal<CustomerPayment[]> = signal([]);


  // get
  get cart(): Signal<CartItem[]|undefined> {
    return this._cart;
  }

  get cartTotal(): Signal<number> {
    return this._cartTotal;
  }

  get cartItems(): Signal<number> {
    return this._cartItems;
  }

  get paymentMethods(): Signal<CustomerPayment[]> {
    return this._paymentMethods;
  }


  // publics
  async addToCart(productId: number, quantity: number) {
    await this.api.updateShoppingCart(productId, quantity);
    await this.refreshCart();
  }

  async removeFromCart(productId: number) {
    await this.api.updateShoppingCart(productId, 0);
    await this.refreshCart();
  }

  async updateAmountInCart(productId: number, quantity: number) {
    await this.api.updateShoppingCart(productId, quantity);
    await this.refreshCart();
  }

  createOrder() {
    throw new Error('not implemented')
  }

  async refreshCart() {
    const items = await this.api.getShoppingCart();
    if (items) this._cart.set(items)
  }

  async resetCart() {
    await this.api.resetShoppingCart()
    this._cart.set([]);
  }

  async checkout() {
    return this.api.checkout()
  }

  async deletePaymentMethod(payment_id: string) {
    await this.api.deletePaymentMethod(payment_id);
    this._paymentMethods.update(m=>m?.filter(p=>p.payment_id!==payment_id))
  }

  async createPaymentMethod(nickname: string, territory: string) {
    await this.api.createPaymentMethod(nickname, territory);
    this._paymentMethods.set(await this.api.getPaymentMethods()??[]);
  }

  async refreshPaymentMethods() {
    this._paymentMethods.set(await this.api.getPaymentMethods()??[]);
  }
}
