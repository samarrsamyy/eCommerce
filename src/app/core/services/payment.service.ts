import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}

  cashPayment(cartId: string | null, shippingDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: shippingDetails,
      }
    );
  }

  creditPayment(
    cartId: string | null,
    shippingDetails: object
  ): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.url}`,
      {
        shippingAddress: shippingDetails,
      }
    );
  }

  allmyOrder(userId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${userId}`
    );
  }
}
