import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {LoginService} from "../../../app/services/login.service";

@Component({
  selector: 'customer-landing-page',
  templateUrl: './customer-profile-page.component.html',
  standalone: true,
})
export class CustomerProfilePageComponent implements OnInit {
  login = inject(LoginService);
  user: WritableSignal<any> = signal(undefined);
  accountComplete: WritableSignal<boolean> = signal(false);

  async ngOnInit() {

    let user = await this.login.getUser()
    let hasCustomerPermission = await this.login.hasPermission('cmx_coffee:customer')
    this.user.set(user);
    this.accountComplete.set(hasCustomerPermission)
  }
}
