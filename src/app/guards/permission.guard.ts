import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";
import {tryTimes} from "../utils";


export const HasPermission = (permission: string): CanActivateFn => {
  return async (route, state): Promise<boolean> => {
    const login = inject(LoginService);

    if (!await login.isAuthenticated()) {
      await login.login(state.url);
    }

    const hasPermission =
      await tryTimes<boolean>(()=>login.hasPermission(permission), 3);
    return hasPermission!
  };
};
