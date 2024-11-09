import {Component, inject, OnInit} from "@angular/core";
import {ShoppingCartService} from "../../services/shopping-cart.service";


@Component({
  selector: "app-shopping-cart-page",
  templateUrl: "./shopping-cart-page.component.html",
  standalone: true,
  host: {'class': 'flex-child'}
})
export class ShoppingCartPageComponent implements OnInit {
  cart = inject(ShoppingCartService);


  async ngOnInit() {
    await this.cart.refreshCart()
  }

}
