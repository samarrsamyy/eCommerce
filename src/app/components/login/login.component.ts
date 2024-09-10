import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink,TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);

  msgSuccess: boolean = false;
  loginFormSub!:Subscription

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginSubmit(): void {

    if (this.loginForm.valid) {
      this.loginFormSub = this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          // console.log(res);

          if (res.message == 'success') {
            this.msgSuccess = true;
            setTimeout(() => {

              // 1- save token
              localStorage.setItem('userToken' , res.token)

              // 2-decode Token

              this._AuthService.saveUserData()


              // 3- navigation
              this._Router.navigate(['/home']);
            }, 2000);
          }
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
      this.loginFormSub?.unsubscribe()
  }
}
