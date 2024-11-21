import { IfStmt } from "@angular/compiler";
import {Component, OnInit, WritableSignal, effect, inject, signal} from "@angular/core";
import { CheckboxSelectorComponent, CheckboxSelectorFormControl } from "src/components/checkbox-selector/checkbox-selector.component";
import { RadioButtonFormControl, RadioButtonGroupComponent } from "src/components/radio-button-group/radio-button-group.component";
import { ApiClient } from "src/services/api-client.service";
import { yn } from "src/types";

@Component({
    selector: "app-account-newsletter-page",
    templateUrl: "./account-newsletter-page.component.html",
    styleUrl: "./account-newsletter-page.component.scss",
    imports:[
      CheckboxSelectorComponent,
    ],
    host: { class: 'flex-child' }
})
export class AccountNewsletterPageComponent implements OnInit {


  client = inject(ApiClient);

  newsletterStatusForm: CheckboxSelectorFormControl = new CheckboxSelectorFormControl([
    {value: 'y', label:  'I would like to recieve whatever newsletter stuff' }
  ])

  status: WritableSignal<'Active'|'Inactive'> = signal('Inactive')

  // on FIRST component render
  async ngOnInit() {
    const isSubscribed = (await this.client.getCustomerPreferences()).newsletter_subscription
    if (isSubscribed==='y') {
      this.newsletterStatusForm.value = ['y'];
      this.handleCheckboxToggle()
    }
  }

  handleCheckboxToggle() {
    const vals = this.newsletterStatusForm.value
    if (vals.includes('y')) {
      this.status.set('Active');
    } else {
      this.status.set('Inactive');
    }
  }

  async handleSaveNewsletterPreference() {
    await this.client.updateCustomerPreferences({
      newsletter_subscription: yn(this.newsletterStatusForm.value.includes('y'))
    })
  }
}

