import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private ACCESS = 'access_token';
  private REFRESH = 'refresh_token';

  // ✅ AJOUT OBLIGATOIRE
  set(token: string): void {
    localStorage.setItem(this.ACCESS, token);
  }

  setRefresh(token: string): void {
    localStorage.setItem(this.REFRESH, token);
  }

  get(): string | null {
    return localStorage.getItem(this.ACCESS);
  }

  has(): boolean {
    return !!this.get();
  }

  clear(): void {
    localStorage.removeItem(this.ACCESS);
    localStorage.removeItem(this.REFRESH);
  }

  isExpired(): boolean {
    const token = this.get();
    if (!token) return true;

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  decode<T = any>(): T | null {
    const token = this.get();
    if (!token) return null;
    return jwtDecode<T>(token);
  }
}
