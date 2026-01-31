import { signal, computed, Injectable } from '@angular/core';
import { User } from '../models/user.model';
@Injectable({ providedIn: 'root' }) 
export class AuthState {
  
  private _user = signal<User | null>(null);

  user = this._user.asReadonly();
  isAuthenticated = computed(() => !!this._user());

  setUser(user: User) {
    this._user.set(user);
  }

  clear() {
    this._user.set(null);
  }
}
