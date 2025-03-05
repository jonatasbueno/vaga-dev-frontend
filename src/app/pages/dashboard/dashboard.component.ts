import { Component } from '@angular/core';

import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InputStyleDirective, PaginationComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentPage: number = 1;

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log('Página alterada para:', page);
  }
}
