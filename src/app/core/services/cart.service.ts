import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumber :WritableSignal<number> = signal(0)

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  updateCartProductCount(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: newCount,
    });
  }

  getCartProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeSpecificItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  deleteCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
