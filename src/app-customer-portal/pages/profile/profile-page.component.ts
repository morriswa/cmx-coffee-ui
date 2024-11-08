import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {ApiClient} from "../../../services/api-client.service";
import {Dialog} from "@angular/cdk/dialog";
import {CoffeeQuestionnaireComponent} from "../../components/taste-questionnaire/coffee-questionnaire.component";
import {UserService} from "../../services/user.service";


@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})
export class ProfilePageComponent{

  // services
  api = inject(ApiClient);
  dialogs = inject(Dialog);
  userSa = inject(UserService);


  openCoffeeQuestionnaire() {
    const ref = this.dialogs.open(CoffeeQuestionnaireComponent);

    let subscription = ref.closed.subscribe(async (res)=>{
      // TODO update preferences in view after saved
      console.log(await this.api.getCustomerPreferences())
      subscription.unsubscribe();
    });
  }
}
