import {Component, inject} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {ApiClient} from "src/services/api-client.service";
import {Dialog} from "@angular/cdk/dialog";
import {CoffeeQuestionnaireComponent} from "src/app-customer-portal/components/taste-questionnaire/coffee-questionnaire.component";
import {LoginService} from "src/services/login.service";


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
  userSa = inject(LoginService);


  openCoffeeQuestionnaire() {
    const ref = this.dialogs.open(CoffeeQuestionnaireComponent);

    let subscription = ref.closed.subscribe(async (res)=>{
      // TODO update preferences in view after saved
      console.log(await this.api.getCustomerPreferences())
      subscription.unsubscribe();
    });
  }
}
