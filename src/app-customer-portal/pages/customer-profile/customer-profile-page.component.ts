import {Component, computed, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {LoginService} from "src/services/login.service";
import {Dialog} from "@angular/cdk/dialog";
import {CoffeeQuestionnaireComponent} from "../../components/taste-questionnaire/coffee-questionnaire.component";
import {ApiClient} from "../../../services/api-client.service";


@Component({
  selector: 'customer-landing-page',
  templateUrl: './customer-profile-page.component.html',
  standalone: true,
})
export class CustomerProfilePageComponent implements OnInit {

  // services
  login = inject(LoginService);
  api = inject(ApiClient);
  dialogs = inject(Dialog);


  // state
  user: WritableSignal<any> = signal(undefined);
  accountComplete: WritableSignal<boolean> = signal(false);
  firstName = computed(()=>{
    const user = this.user();
    if (user?.name) {
      const fullName = user.name;
      const names = fullName.split(' ');
      return names[0];
    }
    return ''
  })


  // lifecycle
  async ngOnInit() {

    let user = await this.login.getUser()
    let hasCustomerPermission = await this.login.hasPermission('cmx_coffee:customer')
    this.user.set(user);
    this.accountComplete.set(hasCustomerPermission)

    // TODO add preferences to view
    console.log(await this.api.getCustomerPreferences())
  }

  openCoffeeQuestionnaire() {
    const ref = this.dialogs.open(CoffeeQuestionnaireComponent);

    let subscription = ref.closed.subscribe(async (res)=>{
      // TODO update preferences in view after saved
      console.log(await this.api.getCustomerPreferences())
      subscription.unsubscribe();
    });
  }
}
