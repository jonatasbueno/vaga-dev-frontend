import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  hasSubmenu: boolean;
  subItems?: { label: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'assets/icons/dash.png',
      hasSubmenu: true,
      subItems: [{ label: 'Gerenciar' }]
    },
    {
      label: 'Usuários',
      icon: 'assets/icons/users.png',
      hasSubmenu: true,
      subItems: [{ label: 'Listagem' }, { label: 'Cadastrar' }]
    }
  ];

  isOpen(index: number): boolean {
    return this.navItems[index].hasSubmenu;
  }

  toggleSubmenu(index: number): void {
    this.navItems[index].hasSubmenu = !this.navItems[index].hasSubmenu;
  }
}
