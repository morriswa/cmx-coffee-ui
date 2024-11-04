import {Component, Input} from "@angular/core";
import {Product} from 'src/types/product.type';
import {CurrencyPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "app-product-tile",
  templateUrl: "./product-tile.component.html",
  imports: [
    CurrencyPipe,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ProductTileComponent {
  @Input() product!: Product;
}
