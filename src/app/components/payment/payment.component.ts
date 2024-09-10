import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule ,TranslateModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);



  paymentMethod: FormGroup = this._FormBuilder.group({
    pay: [null, [Validators.required]],
  });


  paramMapSub!:Subscription

  submit() {
    
    if (this.paymentMethod.get('pay')?.value == 'Cash on Delivery') {
      this._ActivatedRoute.paramMap.subscribe({
        next: (param) => {
          console.log(param.get('id'));
          let cartId = param.get('id');

          this._Router.navigate(['/cashPayment', cartId]);
        }
      });
    }
    else  if (this.paymentMethod.get('pay')?.value == 'Credit Card') {
      this._ActivatedRoute.paramMap.subscribe({
        next: (param) => {
          // console.log(param.get('id'));
          let cartId = param.get('id');

          this._Router.navigate(['/creditPayment', cartId]);
        }
      });
    }
    console.log(this.paymentMethod.value);
  }



  ngOnDestroy(): void {
      this.paramMapSub?.unsubscribe()
  }
}
