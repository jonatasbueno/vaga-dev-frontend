import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';
import { ToggleComponent } from '../../shared/components/toggle/toggle.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, InputStyleDirective, ToggleComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
