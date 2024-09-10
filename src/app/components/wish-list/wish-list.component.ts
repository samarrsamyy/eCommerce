import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../core/services/wish-list.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule, RouterLink, CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit, OnDestroy {
  private readonly _WishListService = inject(WishListService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  wishList: WritableSignal<Iproduct[]> = signal([]);

  getWishListSub!: Subscription;
  ngOnInit(): void {
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList.set(res.data);
      },
    });
  }
  addProductToCartSub!: Subscription;
  getProduct(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._CartService.cartNumber.set(res.numOfCartItems);
        }
      },
    });
  }


  removeProductSub!:Subscription

  removeFromList(id: string): void {
    this._WishListService.removeProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'success') {
          this._ToastrService.success(res.message);
          this._WishListService.getWishList().subscribe({
            next: (res) => {
              console.log(res);
              this.wishList.set(res.data);
            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.getWishListSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.removeProductSub?.unsubscribe();
  }
}
