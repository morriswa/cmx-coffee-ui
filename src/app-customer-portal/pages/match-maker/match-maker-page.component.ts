import {Component, inject} from "@angular/core";
import {CoffeeQuestionnaireComponent} from "../../components/taste-questionnaire/coffee-questionnaire.component";
import {Dialog} from "@angular/cdk/dialog";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-match-maker-page',
  templateUrl: './match-maker-page.component.html',
  host: { 'class': 'flex-col align-items-center' },
  imports: [
    RouterLink
  ]
})
export class MatchMakerPageComponent {

  dialogs = inject(Dialog);

  openTasteQuestionnaire() {
    const ref = this.dialogs.open(CoffeeQuestionnaireComponent);
  }
}
