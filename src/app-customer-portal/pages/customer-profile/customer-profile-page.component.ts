import {Component, computed, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {LoginService} from "src/services/login.service";
import {Dialog} from "@angular/cdk/dialog";
import {CoffeeQuestionnaireComponent} from "../../components/taste-questionnaire/coffee-questionnaire.component";


@Component({
  selector: 'customer-landing-page',
  templateUrl: './customer-profile-page.component.html',
  standalone: true,
})
export class CustomerProfilePageComponent implements OnInit {

  // services
  login = inject(LoginService);
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
  }

  openCoffeeQuestionnaire() {
    const ref = this.dialogs.open(CoffeeQuestionnaireComponent);

    let subscription = ref.closed.subscribe((res)=>{
      this.saveCoffeeQuestionnaire(res)
      subscription.unsubscribe();
    });
  }

  saveCoffeeQuestionnaire(res: any) {
    console.log(res);
    // todo implement me
  }
}
