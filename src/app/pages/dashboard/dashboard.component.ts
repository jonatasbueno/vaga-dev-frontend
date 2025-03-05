import { Component } from '@angular/core';

import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InputStyleDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
