import { Injectable, signal, inject, effect } from '@angular/core';
import { Credentials } from '../types';
import { HttpClient } from '@angular/common/http';

const TOKEN = 'token'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = "https://reqres.in/api/login"
  registers = signal<any>(null)
  token = signal<any>(null)
  private http = inject(HttpClient)

  constructor() {
    effect(() => {
      localStorage.setItem(TOKEN, JSON.stringify(this.token()));
    })

    const tokenString = localStorage.getItem(TOKEN)
    tokenString && this.token.set(JSON.parse(tokenString))
  }

  sendCredentials(values: Credentials) {
    this.http.post(this.url, values)
      .subscribe({
        next: (data) => {
          this.token.set(data)
        },
        error: () => {
          console.error('Erro ao carregar registros')
          this.token.set(null)
        }
      })
  }
}
