import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe ,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);

  cartProducts: ICart = {} as ICart;
  productLength: number = 0;

  getCartProductsSub!: Subscription;

  ngOnInit(): void {
    this._CartService.getCartProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.cartProducts = res.data;
        this.productLength = this.cartProducts.products.length;
      },
    });
  }

  removeSpecificItemSub!: Subscription;

  deleteItem(id: string): void {
    Swal.fire({
      title: 'FreshCart',
      text: "Are you sure you want delete item ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your item has been deleted.',
            icon: 'success',
          }).then(() => {
            this._CartService.removeSpecificItem(id).subscribe({
              next: (res) => {
                console.log(res.data)
                this.cartProducts = res.data;
                this._CartService.cartNumber.set(res.numOfCartItems);
              },
            });
          });
        }
      })
      
  }

  updateCartProductCountSub!: Subscription;
  updateCount(id: string, newCount: number): void {
    if (newCount > 0) {
      this._CartService.updateCartProductCount(id, newCount).subscribe({
        next: (res) => {
          console.log(res);
          this.cartProducts = res.data;
        },
      });
    }
  }

  clearCart(): void {
    Swal.fire({
      title: 'FreshCart',
      text: "Are you sure? You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your cart has been deleted.',
            icon: 'success',
          }) .then(() => {
            this._CartService.deleteCart().subscribe({
              next: (res) => {
                console.log(res);
                this.cartProducts = {} as ICart;
                this.productLength = 0;
                this._CartService.cartNumber.set(0);
              },
            });
          });
        }
      })
     
  }

  ngOnDestroy(): void {
    this.getCartProductsSub?.unsubscribe();
    this.removeSpecificItemSub?.unsubscribe();
    this.updateCartProductCountSub?.unsubscribe();
  }

  checkOut(cartId: string) {
    this._Router.navigate(['/payment', cartId]);
  }
}
