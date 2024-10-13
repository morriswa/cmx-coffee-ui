import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";
import {tryTimes} from "src/app/utils";


export const HasPermission = (permission: string): CanActivateFn => {
  return async (route, state): Promise<boolean> => {
    const login = inject(LoginService);
    const router = inject(Router);

    if (!await login.isAuthenticated()) {
      await login.login([state.url]);
      return false;
    }

    const hasPermission =
      await tryTimes<boolean>(()=>login.hasPermission(permission), 3);

    if (!hasPermission) {
      await router.navigate(['/forbidden']);
      return false;
    } else {
      return hasPermission
    }
  };
};
