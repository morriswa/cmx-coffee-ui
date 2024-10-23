import {inject, Injectable, signal, WritableSignal} from "@angular/core";
import {AuthService} from "@auth0/auth0-angular";
import {firstValueFrom, Observable} from "rxjs";
import {ApiClient} from "./api-client.service";
import {Router} from "@angular/router";
import {AUTH0_CONFIG} from "../../environments/environment";


@Injectable()
export class LoginService {

  // services
  private auth0 = inject(AuthService)
  private apiClient = inject(ApiClient);
  private router = inject(Router);

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
    const perms = await this.apiClient.permissions()
    this.permissions.set(perms);
  }

  async login(dest: string[] = ['/']): Promise<void> {
    localStorage.setItem('login-service.login.dest', JSON.stringify(dest))

    await new Promise((resolve)=>{
      const loginActionSubscription = this.auth0.loginWithRedirect()
        .subscribe(()=>{
          loginActionSubscription.unsubscribe();
          resolve("completed login");
        });
    });
  }

  async callback() {
    await this.refreshPerms();
    const dest = localStorage.getItem('login-service.login.dest');
    if (dest) {
      localStorage.removeItem('login-service.login.dest');
      await this.router.navigate(JSON.parse(dest));
    }
  }

  logout() {
    const logoutActionSubscription = this.auth0.logout({logoutParams: {returnTo: AUTH0_CONFIG.logoutUrl}})
      .subscribe(()=>logoutActionSubscription.unsubscribe());
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.auth0.isAuthenticated$
  }

  get isAuthenticated(): Promise<boolean> {
    return firstValueFrom(this.auth0.isAuthenticated$)
  }

  async hasPermission(permission: string): Promise<boolean> {
    if (!this.ready()) throw new Error('login-service is not ready :(')
    const perms = this.permissions();
    return perms.includes(permission)
  }
}
