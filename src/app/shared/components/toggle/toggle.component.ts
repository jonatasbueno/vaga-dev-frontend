import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  private isActive = false;

  @HostListener('click', ['$event'])
  toggleAnimation(): void {
    this.isActive = !this.isActive;

    const container = document.querySelector('.toggle-container') as HTMLElement;

    if (container) {
      container.classList.toggle('active');
    }
  }
}