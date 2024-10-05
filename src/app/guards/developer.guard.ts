import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";

export const DeveloperGuard: CanActivateFn = async (route, state): Promise<boolean> => {
  const login = inject(LoginService);

  if (!await login.isAuthenticated()) {
    await login.login()
  }

  const hasPermission = login.hasPermission('cmx_coffee:admin');
  return hasPermission
}
