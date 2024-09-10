import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from './../../core/services/auth.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {

  
  private readonly _AuthService = inject(AuthService);

  private readonly _FormBuilder = inject(FormBuilder);

  private readonly _Router= inject(Router)

  msgSuccess: boolean =false;
  registerFormSub!:Subscription

  //!using rxweb

  // registerForm:FormGroup = this._FormBuilder.group({
  //   name: [null , [RxwebValidators.required(), RxwebValidators.minLength({value:3 }) ,RxwebValidators.maxLength({value:20 })]],
  //   email: [null, [RxwebValidators.required(), RxwebValidators.email()]],
  //   password: [null,[ RxwebValidators.required(), RxwebValidators.pattern({expression:{'password':/^[A-Z][a-z0-9]{6,10}$/}})]],
  //   rePassword:[null ,[ RxwebValidators.compare({fieldName:'password'})]],
  //   phone:[null, [RxwebValidators.required() , RxwebValidators.pattern({expression:{'phone':/^01[0125][0-9]{8}$/}})]]
  // } )


  //!using validators

  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^\w{6,}$/)],
      ],
      rePassword: [null, [Validators.required]],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );

  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
  //     ]),
  //     rePassword: new FormControl(null),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  registerSubmit(): void {
    
    if (this.registerForm.valid) {
     this.registerFormSub= this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res); 

          if(res.message == 'success'){
            this.msgSuccess=true
          setTimeout(() => {
            this._Router.navigate(['/login'])
          }, 2000);
        }

       
        }
      });
    } else {
      this.registerForm.setErrors({notMatch:true});
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { notMatch: true };
    }
  }

  ngOnDestroy(): void {
      this.registerFormSub?.unsubscribe()
  }
}
