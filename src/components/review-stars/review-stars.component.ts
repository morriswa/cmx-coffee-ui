import {Component, Input} from "@angular/core";
import {DecimalPipe, NgClass} from "@angular/common";
import {ProductReviewStats} from "src/types/product.type";


@Component({
  selector: "review-stars",
  templateUrl: "./review-stars.component.html",
  styleUrl: "./review-stars.component.scss",
  imports: [
    NgClass,
    DecimalPipe
  ],
  standalone: true
})
export class ReviewStarsComponent {
  @Input() stats: ProductReviewStats = {review_count: 0};

  highlighted(num: number): boolean {
    return num < (this.stats.average_review_score ?? 0);
  }
}
