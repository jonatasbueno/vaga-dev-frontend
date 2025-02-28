import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistersService {
  private url = "https://reqres.in/api/users"
  registers = signal<any>(null)
  private http = inject(HttpClient)

  getRegisters(page = 1, perPage = 5) {
    this.http.get<any>(`${this.url}?page=${page}&per_page=${perPage}`)
      .subscribe({
        next: (data) => {
          this.registers.set(data)
        },
        error: () => {
          console.error('Erro ao carregar registros')
          this.registers.set(null)
        }
      })
  }
}
