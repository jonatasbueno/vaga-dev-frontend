import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FooterComponent } from '../../shared/components/footer/footer.component';
import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';
import { ToggleComponent } from '../../shared/components/toggle/toggle.component';
import { AuthService } from '../../shared/state/auth/auth.service';
import { AuthState, AuthStatus } from '../../shared/state/auth/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, InputStyleDirective, ToggleComponent, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  authState: AuthStatus = { state: AuthState.IDLE, isAuthenticated: false, token: null }
  authService = inject(AuthService)
  router = inject(Router)


  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    effect(() => {
      this.authState = this.authService.getAuthStatus()();
      this.authState.isAuthenticated && this.router.navigate(['/dashboard']);
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
    }
  }
}
