import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-credit-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,TranslateModule],
  templateUrl: './credit-payment.component.html',
  styleUrl: './credit-payment.component.scss',
})
export class CreditPaymentComponent implements OnInit, OnDestroy {
  private readonly _PaymentService = inject(PaymentService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);

  shippingAdress: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, [Validators.required]],
  });

  cartId!: string | null;

  paramMapSub!: Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));
        this.cartId = param.get('id');
      },
    });
  }

  submit() {
    if (this.shippingAdress.status == 'VALID') {
      this._PaymentService
        .creditPayment(this.cartId, this.shippingAdress.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              window.open(res.session.url, '_self');
            }
          },
        });
    } else {
      this.shippingAdress.markAllAsTouched();
      this._ToastrService.error('Please Enter Valid Shipping Details!');
    }
  }

  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe();
  }
}
