import {Component, inject, OnInit} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../../services/login.service";

@Component({
  selector: "app-auth-callback",
  template: '',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ]
})
export class Auth0CallbackComponent implements OnInit {
  login = inject(LoginService);

  ngOnInit(): void {
    this.login.callback()
  }
}
