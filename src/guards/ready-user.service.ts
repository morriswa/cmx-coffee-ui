import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {UserService} from "src/app-customer-portal/services/user.service";


export const ReadyUserService: CanActivateFn = async (): Promise<boolean> => {
  const userSa = inject(UserService);

  if (!userSa.ready)
    await userSa.refreshUserCache()

  return true;
}
