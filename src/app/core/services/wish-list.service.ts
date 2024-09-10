import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient:HttpClient) { }




  addProducttoWish(id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
    }
    )
  }


  removeProduct(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

  getWishList():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }





}
