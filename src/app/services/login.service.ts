import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {firstValueFrom} from "rxjs";
import {ApiClient} from "./api-client.service";


@Injectable()
export class LoginService {

  // services
  private auth0 = inject(AuthService)
  private apiClient = inject(ApiClient);

  private permissions: WritableSignal<string[]> = signal([]);
  private ready: WritableSignal<boolean> = signal(false);

  constructor() {
    const authCheck = this.auth0.isAuthenticated$.subscribe(async (isAuthenticated) => {
      if (isAuthenticated) await this.refreshPerms();
      else this.permissions.set([]);

      this.ready.set(true);
      authCheck.unsubscribe();
    });
  }

  private async refreshPerms() {
    const perms = (await this.apiClient.login()).permissions
    this.permissions.set(perms);
  }

  async login(dest: string = ''): Promise<void> {
    await new Promise((resolve)=>{
      const loginActionSubscription = this.auth0.loginWithRedirect({
        appState: {target: dest}
      }).subscribe(()=>{
        loginActionSubscription.unsubscribe();
        resolve("completed login");
      });
    });

    await this.refreshPerms();
  }

  logout() {
    const logoutActionSubscription = this.auth0.logout()
      .subscribe(()=>logoutActionSubscription.unsubscribe());
  }

  isAuthenticated(): Promise<boolean> {
    return firstValueFrom(this.auth0.isAuthenticated$)
  }

  async hasPermission(permission: string): Promise<boolean> {
    if (!this.ready()) throw new Error('login-service is not ready :(')
    const perms = this.permissions();
    return perms.includes(permission)
  }
}
