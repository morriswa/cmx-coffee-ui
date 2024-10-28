import {Component, inject} from "@angular/core";
import {TasteQuestionnaireComponent} from "../taste-questionnaire/taste-questionnaire.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans-page.component.html',
  standalone: true
})
export class SubscriptionPlansPageComponent {

  dialogs = inject(Dialog);

  openTasteQuestionnaire() {
    const ref = this.dialogs.open(TasteQuestionnaireComponent);
  }
}
