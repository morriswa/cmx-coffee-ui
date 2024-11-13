import {Component, inject, OnInit} from "@angular/core";
import {ShoppingCartService} from "src/app-customer-portal/services/shopping-cart.service";
import {CurrencyPipe, NgIf} from "@angular/common";
import {FancyButtonComponent} from "src/components/fancy-button/fancy-button.component";
import {RouterLink} from "@angular/router";
import {LoaderComponent} from "src/components/loader/loader.component";
import {NumberStepperComponent} from "../../../components/number-stepper/number-stepper.component";
import {ShoppingCartItemComponent} from "../../components/shopping-cart-item/shopping-cart-item.component";


@Component({
  selector: "app-shopping-cart-page",
  templateUrl: "./shopping-cart-page.component.html",
  styleUrl: "./shopping-cart-page.component.scss",
  standalone: true,
  imports: [
    CurrencyPipe,
    FancyButtonComponent,
    RouterLink,
    NgIf,
    LoaderComponent,
    NumberStepperComponent,
    ShoppingCartItemComponent
  ],
  host: {'class': 'flex-child'}
})
export class ShoppingCartPageComponent implements OnInit {
  cart = inject(ShoppingCartService);


  async ngOnInit() {
    await this.cart.refreshCart()
  }

  async handleUpdateItemQuantity(productId: number, quantity: number) {
    await this.cart.updateAmountInCart(productId, quantity)
  }
}
