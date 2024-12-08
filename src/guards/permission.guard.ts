import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";
import {until} from "src/utils";


export const HasPermission = (permission: string): CanActivateFn => {
  return async (route, state): Promise<boolean> => {
    const login = inject(LoginService);
    const router = inject(Router);

    await until(login.ready)
    if (!login.isAuthenticated) {
      console.log('AUTH0 DEBUG: user was not authenticated, attempting login')
      try {
        await login.login([state.url]);
        console.log('AUTH0 DEBUG: successfully logged in')
      } catch (e) {
        console.error('AUTH0 DEBUG: DID NOT RETURN successfully from login')
        console.error(e);
      }
      return false;
    }

    console.log('AUTH0 DEBUG: is authenticated...')

    if (await login.isTokenExpired()) {
      console.log('AUTH0 DEBUG: token is expired, logging out...')
      login.logout();
      return false;
    }

    const hasPermission = login.hasPermission(permission);

    if (!hasPermission) {
      console.log('AUTH0 DEBUG: user does not have appropriate permissions...')
      await router.navigate(['/forbidden']);
      return false;
    } else {
      return hasPermission
    }
  };
};
