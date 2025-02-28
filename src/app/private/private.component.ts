import { Component, inject } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { RegistersService } from '../services/registers.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../shared/pagination/pagination.component';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [FooterComponent, CommonModule, PaginationComponent],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
  isPrivate = true
  registerService = inject(RegistersService)

  ngOnInit() {
    this.registerService.getRegisters()
  }

  changePage(event: Event) {
    const selectPage = event.target as HTMLSelectElement;
    this.registerService.getRegisters(this.registerService.registers()?.page, +selectPage.value)
  }
}
