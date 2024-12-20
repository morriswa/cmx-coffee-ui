import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {AuthService, User} from "@auth0/auth0-angular";
import {firstValueFrom} from "rxjs";
import {ApiClient} from "./api-client.service";
import {Router} from "@angular/router";
import {AUTH0_CONFIG} from "src/environments/environment";


@Injectable()
export class LoginService {

  // services
  private auth0 = inject(AuthService)
  private apiClient = inject(ApiClient);
  private router = inject(Router);


  // state
  private _ready: WritableSignal<boolean> = signal(false);
  private _isAuthenticated: WritableSignal<boolean> = signal(false);
  private _user: WritableSignal<User|undefined> = signal(undefined);
  private _permissions: WritableSignal<string[]> = signal([]);


  // public
  get isAuthenticated(): boolean {
    this.assertReady();
    return this._isAuthenticated()
  }

  hasPermission(permission: string): boolean {
    this.assertReady();
    const perms = this._permissions();
    return perms.includes(permission)
  }


  // signals
  firstName = computed(()=>{
    const user = this._user();
    if (user?.name) {
      const fullName = user.name;
      const names = fullName.split(' ');
      return names[0];
    }
    return ''
  })

  user = computed(()=>{
    this.assertReady();
    const user = this._user();
    if (!user) throw new Error('no cached user');
    return user;
  })


  get permissions(): Signal<string[]> {
    return this._permissions;
  }

  get ready(): Signal<boolean> {
    return this._ready;
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
    await this.refreshPermissions();
    const dest = localStorage.getItem('login-service.login.dest');
    if (dest) {
      localStorage.removeItem('login-service.login.dest');
      await this.router.navigate(JSON.parse(dest));
    }
  }

  logout() {
    this.auth0.logout({logoutParams: {returnTo: AUTH0_CONFIG.logoutUrl}});
  }


  // logic

  async isTokenExpired(): Promise<boolean> {
    const token = await firstValueFrom(this.auth0.idTokenClaims$);
    const expiration_timestamp = token?.exp;

    if (expiration_timestamp) {
      return (expiration_timestamp * 1000) < new Date().getTime();
    } else {
      throw new Error('failed to retrieve expiration time from token')
    }
  }

  async refreshPermissions() {
    const perms = await this.apiClient.permissions()
    this._permissions.set(perms);
  }

  async refreshUserCache() {
    const user = await firstValueFrom(this.auth0.user$) ?? undefined;
    this._user.set(user);
  }

  init() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('took longer than 30 seconds to initialize LoginService'));
      }, 30_000);
      this._ready.set(false);
      this.auth0.isAuthenticated$.subscribe(async (isAuthenticated) => {
        if (isAuthenticated) {
          console.log('AUTH0 DEBUG: is authenticated')

          if (await this.isTokenExpired()) {
            console.log('AUTH0 DEBUG: token is expired, attempting logout')
            this.logout()
          } else {
            await this.refreshPermissions();
            await this.refreshUserCache();
          }
        } else {
          this._user.set(undefined);
          this._permissions.set([]);
        }

        this._isAuthenticated.set(isAuthenticated);
        this._ready.set(true);
        resolve('initialized successfully');
      });
    });
  }

  private assertReady() {
    if (!this._ready()) throw new Error('Login Service has NOT been properly initialized...')
  }
}
