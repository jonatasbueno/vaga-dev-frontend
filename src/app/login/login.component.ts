import { Component, effect, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgOptimizedImage, ReactiveFormsModule],
  providers: [DataService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authForm: FormGroup
  dataService = inject(DataService)
  private router = inject(Router)

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    effect(() => {
      if (this.dataService.token()) {
        this.router.navigate(['/private'])
      }
    })
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.dataService.sendCredentials(this.authForm.value)
    }
  }
}
