import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response.model';
import { TokenService } from './token.service';
import { AuthState } from '../state/auth.state';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // private readonly API = 'auth/login';
  private readonly API = "http://localhost:8000/auth";

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authState: AuthState,
    private router: Router
  ) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.API}/login/`, {
  'username': credentials.username,
  'password': credentials.password
});
  }

  handleLoginSuccess(response: AuthResponse) {
    this.tokenService.set(response.access_token);
    // this.authState.setUser(this.mapToUser(response.payload));
    
    const payload = this.tokenService.decode<any>();
    console.log("payload",payload);
    

if (payload) {
  this.authState.setUser({
    id: payload.user_id,
    username: payload.username,
    email: payload.email,
    phone: payload.phone,
    firstName: payload.first_name,
    lastName: payload.last_name,
    groups: payload.groups
  });
}

    this.router.navigateByUrl('');
  }

  logout() {
    this.tokenService.clear();
    this.authState.clear();
    this.router.navigateByUrl('/signin');
  }
//   private mapToUser(payload: AuthResponse['payload']): User {
//   return {
//     id: payload.user_id,
//     username: payload.username,
//     email: payload.email,
//     phone: payload.phone,
//     firstName: payload.first_name,
//     lastName: payload.last_name,
//     groups: payload.groups
//   };
// }

}
