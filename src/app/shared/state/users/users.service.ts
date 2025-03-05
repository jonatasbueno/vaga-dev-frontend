import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsersRequest, UsersStatus } from './types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersStatus = signal<UsersStatus>({
    response: null
  });

  constructor(private http: HttpClient) { }

  getUsersStatus() {
    return this.usersStatus.asReadonly();
  }

  setPage(page: number): void {
    const currentResponse = this.usersStatus().response;

    if (page > 0 && page <= (currentResponse?.totalPages || 1)) {
      this.fetchUsers(page, currentResponse?.perPage || 10);
    }
  }

  setPerPage(perPage: number): void {
    if (perPage > 0) {
      this.fetchUsers(this.usersStatus().response?.page || 1, perPage);
    }
  }

  private fetchUsers(page: number, perPage: number): void {
    this.usersStatus.update(status => ({
      ...status
    }));

    this.http
      .get<UsersRequest>(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`)
      .subscribe({
        next: (response) => {
          const newValues = {
            ...response,
            perPage: response.per_page,
            totalPages: response.total_pages,
            data: response.data.map(user => ({
              id: user.id,
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name,
            }))
          }

          this.usersStatus.set({
            response: newValues
          });
        },
        error: (error) => {
          console.error('Erro ao carregar usuários', error);
          this.usersStatus.update(status => ({
            ...status
          }));
        }
      });
  }
}
