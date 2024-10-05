import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {firstValueFrom, Subscription} from "rxjs";
import {ApiClient} from "./api-client.service";
import {sleep} from "../utils";

@Injectable()
export class LoginService {

  // services
  private auth0 = inject(AuthService)
  private apiClient = inject(ApiClient);

  private permissions: WritableSignal<string[]|undefined> = signal(undefined);
  private loggedIn: WritableSignal<boolean|undefined> = signal(undefined);

  constructor() {
    this.auth0.isAuthenticated$.subscribe(async (isAuthenticated) => {
      if (isAuthenticated) {
        const perms = (await this.apiClient.login()).permissions
        this.permissions.set(perms);
        this.loggedIn.set(true);
      } else {
        this.permissions.set([]);
        this.loggedIn.set(false);
      }
    });
  }

  async login(): Promise<void> {
    let loginActionSubscription: Subscription | undefined = undefined;

    await new Promise((resolve, reject)=>{
      loginActionSubscription = this.auth0.loginWithRedirect().subscribe(()=>{
        loginActionSubscription?.unsubscribe();
        resolve('');
      });
    });


  }

  logout() {
    let logoutActionSubscription: Subscription | undefined = undefined;

    logoutActionSubscription = this.auth0.logout().subscribe(()=>{
      logoutActionSubscription?.unsubscribe();
    })
  }

  isAuthenticated(): Promise<boolean> {
    return firstValueFrom(this.auth0.isAuthenticated$)
  }

  async hasPermission(permission: string): Promise<boolean> {
    const perms = this.permissions();
    if (!perms) {
      await sleep(500)
      return this.hasPermission(permission)
    }

    console.log(perms)
    return perms.includes(permission)
  }
}
