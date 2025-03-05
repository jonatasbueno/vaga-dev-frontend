import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { UsersService } from '../../shared/state/users/users.service';
import { User } from '../../shared/state/users/types';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InputStyleDirective, PaginationComponent, FooterComponent, CommonModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  users: User[] = [];


  constructor(private usersService: UsersService) {
    effect(() => {
      const states = this.usersService.getUsersStatus()();

      this.totalItems = states.response?.total || 0;
      this.itemsPerPage = states.response?.perPage || 10;
      this.currentPage = states.response?.page || 1;
      this.users = states.response?.data || [];
    });
  }

  ngOnInit(): void {
    this.usersService.setPage(this.currentPage);
  }

  onPageChange(page: number): void {
    this.usersService.setPage(page);
  }

  onPerPageChange(event: Event): void {
    const selectEleemnt = event.target as HTMLSelectElement

    this.usersService.setPerPage(+selectEleemnt.value);
  }
}
