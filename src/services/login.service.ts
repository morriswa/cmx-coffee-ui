import {inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {AuthService, User} from "@auth0/auth0-angular";
import {firstValueFrom, Observable} from "rxjs";
import {ApiClient} from "./api-client.service";
import {Router} from "@angular/router";
import {AUTH0_CONFIG} from "src/environments/environment";
import {until} from "src/utils";


@Injectable()
export class LoginService {

  // services
  private auth0 = inject(AuthService)
  private apiClient = inject(ApiClient);
  private router = inject(Router);


  // state
  private _permissions: WritableSignal<string[]> = signal([]);
  private _ready: WritableSignal<boolean> = signal(false);


  constructor() {
    const authCheck = this.auth0.isAuthenticated$.subscribe(async (isAuthenticated) => {
      if (isAuthenticated) {
        console.log('AUTH0 DEBUG: is authenticated')

        if (await this.isTokenExpired()) {
          console.log('AUTH0 DEBUG: token is expired, attempting logout')
          this.logout()
        } else {
          await this.refreshPerms();
        }
      }

      this._ready.set(true);
      authCheck.unsubscribe();
    });
  }


  // publics
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

  get permissions(): string[] {
    if (!this._ready()) return []
    else return this._permissions();
  }

  get ready(): Signal<boolean> {
    return this._ready;
  }

  async hasPermission(permission: string): Promise<boolean> {
    await until(this._ready)
    const perms = this._permissions();
    return perms.includes(permission)
  }

  async getUser() {
    await until(this._ready)
    return await firstValueFrom(this.auth0.user$) as User
  }


  // logic
  private async refreshPerms() {
    const perms = await this.apiClient.permissions()
    this._permissions.set(perms);
  }

  async isTokenExpired(): Promise<boolean> {
    const token = await firstValueFrom(this.auth0.idTokenClaims$);
    const expiration_timestamp = token?.exp;

    if (expiration_timestamp) {
      return (expiration_timestamp * 1000) < new Date().getTime();
    } else {
      throw new Error('failed to retrieve expiration time from token')
    }
  }
}
