import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {User} from "@auth0/auth0-angular";


@Injectable()
export class UserService {

  // deps
  login = inject(LoginService);


  // internal state
  _user: WritableSignal<User|undefined> = signal(undefined);
  _accountComplete: WritableSignal<boolean> = signal(false);
  _ready: WritableSignal<boolean> = signal(false);


  // public
  firstName = computed(()=>{
    const user = this._user();
    if (user?.name) {
      const fullName = user.name;
      const names = fullName.split(' ');
      return names[0];
    }
    return ''
  })

  get user(): User|undefined {
    const user = this._user();
    // if (!user) throw new Error('no cached user');
    return user;
  }

  get accountComplete(): boolean {
    return this._accountComplete();
  }

  get ready() {
    return !!this._user()
  }

  async refreshUserCache() {
    const user = await this.login.getUser()
    this._user.set(user);
    this._accountComplete.set(this.login.hasPermission('cmx_coffee:customer'))
    this._ready.set(true);
  }
}
