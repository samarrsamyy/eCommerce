import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cash-payment',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass ,TranslateModule],
  templateUrl: './cash-payment.component.html',
  styleUrl: './cash-payment.component.scss',
})
export class CashPaymentComponent implements OnDestroy {
  private readonly _PaymentService = inject(PaymentService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);

  shippingAdress: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, [Validators.required]],
  });

  paramMapSub!: Subscription;
  cashPaymentSub!: Subscription;

  submit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        // console.log(param.get('id'));
        console.log(this.shippingAdress);
        let cartId = param.get('id');

        if (this.shippingAdress.status == 'VALID') {
          this._PaymentService
            .cashPayment(cartId, this.shippingAdress.value)
            .subscribe({
              next: (res) => {
                console.log(res);

                this._ToastrService.success('Order Created Successful!');
                this._Router.navigate(['/allorders']);
              },
            });
        } else {
          this.shippingAdress.markAllAsTouched();
          this._ToastrService.error('Please Enter Valid Shipping Details!');
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe();
    this.cashPaymentSub?.unsubscribe();
  }
}
