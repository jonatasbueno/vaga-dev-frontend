import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { LoginCredentials, AuthResponse, AuthState, AuthStatus } from './types';
import { URL_PREFIX } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenLocalStorage = localStorage.getItem('token')
  private pathEndpoint = `${URL_PREFIX}/login`;
  private authStatus = signal<AuthStatus>({
    token: this.tokenLocalStorage || null,
    state: AuthState.IDLE,
    isAuthenticated: !!this.tokenLocalStorage
  });

  constructor(private http: HttpClient) {
    effect(() => {
      const { isAuthenticated, token, state } = this.authStatus();

      token
        ? localStorage.setItem('token', token)
        : localStorage.removeItem('token')

      isAuthenticated !== !!token &&
        this.authStatus.update(current => ({
          ...current,
          isAuthenticated: !!current.token
        }));

      state === AuthState.ERROR &&
        this.authStatus.update(current => ({
          ...current,
          token: null,
          isAuthenticated: false
        }));
    });
  }

  private onError() {
    this.authStatus.update(status => ({
      ...status,
      state: AuthState.ERROR,
      isAuthenticated: false
    }));
  }

  getAuthStatus() {
    return this.authStatus.asReadonly();
  }

  login(credentials: LoginCredentials): void {
    this.authStatus.update(status => ({
      ...status,
      state: AuthState.LOADING
    }));

    this.http
      .post<AuthResponse>(this.pathEndpoint, credentials)
      .pipe(
        catchError(error => {
          this.authStatus.update(status => ({
            ...status,
            state: AuthState.ERROR
          }));
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          response?.token
            ? this.authStatus.set({
              token: response.token,
              state: AuthState.SUCCESS,
              isAuthenticated: true
            })
            : this.onError();
        },
        error: (err) => {
          console.error('Erro ao fazer login', err);
          this.onError();
        }
      });
  }

  logout() {
    this.authStatus.set({
      token: null,
      state: AuthState.IDLE,
      isAuthenticated: false
    });
  }
}