import { computed, signal, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: string;
  exp: number;
  username: string;
}

interface User {
  id: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private router = inject(Router);

  private _user = signal<User | null>(this.loadUserFromToken());

  public isAuthenticated = computed<boolean>(() => !!this._user());

  public user = computed(() => this._user());

  public username = computed(() => this._user()?.username || null);

  private loadUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode<TokenPayload>(token);

        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem(this.TOKEN_KEY);
            return null;
        }

        return { id: decoded.id, username: decoded.username };
    } catch (error) {
        localStorage.removeItem(this.TOKEN_KEY);
        return null;
    }
  }

  public handleCallback(url: string): boolean {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const token = urlParams.get('token');

    if (token) {
      this.setAuthSuccess(token);
      return true;
    }
    return false;
  }

  private setAuthSuccess(token: string): void {
      localStorage.setItem(this.TOKEN_KEY, token);

      try {
          const decoded = jwtDecode<TokenPayload>(token);

          const newUser: User = {
              id: decoded.id,
              username: decoded.username
          };
          this._user.set(newUser);

      } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.logout();
      }
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
