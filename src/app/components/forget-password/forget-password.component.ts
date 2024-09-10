import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnDestroy {
  step: number = 1;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6,}$/)]],
  });

  resetPass: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  setEmailVerifySub!: Subscription;
  msgSuccess!: string|null;

  emailVerifySubmit(): void {
    let userEmail = this.verifyEmail.get('email')?.value;
    this.resetPass.get('email')?.patchValue(userEmail);

    this.setEmailVerifySub = this._AuthService
      .setEmailVerify(this.verifyEmail.value)
      .subscribe({
        next: (res) => {

          console.log(res);
          if (res.statusMsg == 'success') {
            setTimeout(() => {
              this.step = 2;
              this.msgSuccess=null
            }, 2000);
            this.msgSuccess = res.message;
          }
        }
      });
  }

  setCodeVerifySub!: Subscription;

  codeVerifySubmit(): void {
    this.setCodeVerifySub = this._AuthService
      .setCodeVerify(this.verifyCode.value)
      .subscribe({
        next: (res) => {

          console.log(res);
          if (res.status == 'Success') {
            this.msgSuccess = res.status;
            setTimeout(() => {
              this.step = 3;
              this.msgSuccess=null
            }, 2000);
          }
        }
      });
  }
  setResetPassSub!: Subscription;

  resetPassSubmit(): void {
    this.msgSuccess=null
    this.setResetPassSub = this._AuthService
      .setResetPass(this.resetPass.value)
      .subscribe({
        next: (res) => {

          console.log(res);

          //navigation
          localStorage.setItem('userToken', res.token);

          this._AuthService.saveUserData();

          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2000);

          this.msgSuccess="Password has been changed successfully"

        }
      });
  }

  ngOnDestroy(): void {
    this.setEmailVerifySub?.unsubscribe();
    this.setCodeVerifySub?.unsubscribe();
    this.setResetPassSub?.unsubscribe();
  }
}
