import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }
}
