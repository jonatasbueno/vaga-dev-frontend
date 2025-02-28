import { Component, inject, signal } from '@angular/core';
import { RegistersService } from '../../services/registers.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  registerService = inject(RegistersService)

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.registerService.registers()?.total) {
      this.registerService.getRegisters(newPage, this.registerService.registers()?.per_pages);
    }
  }
}
