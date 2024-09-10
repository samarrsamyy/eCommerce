import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TranslateModule ,RouterLink,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit , OnDestroy{

  private readonly _ProductsService=inject(ProductsService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _WishListService=inject(WishListService)




  productList:WritableSignal<Iproduct[]> = signal([])


  getAllProductsSub!:Subscription

  ngOnInit(): void {
      this._ProductsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.productList.set(res.data)
        }
      })
  }


  addProductToCartSub!: Subscription;
  getProduct(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == 'success'){
        this._ToastrService.success(res.message);
        this._CartService.cartNumber.set(res.numOfCartItems)
        }
      }
    });
  }

  
  addProducttoWishSub!:Subscription
  addToWishList(id:string):void{
    this._WishListService.addProducttoWish(id).subscribe({
      next:(res)=>{
        console.log(res)
        if(res.status == 'success'){
        this._ToastrService.success(res.message);
        }

      }
    })

  }


  ngOnDestroy(): void {
      this.getAllProductsSub?.unsubscribe()
      this.addProductToCartSub?.unsubscribe()
      this.addProducttoWishSub?.unsubscribe()
  }

}
