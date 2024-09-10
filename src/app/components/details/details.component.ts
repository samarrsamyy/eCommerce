import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule ,TranslateModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);


  paramMapSub!: Subscription;
  getSpecificProductSub!: Subscription;
  productDetails: Iproduct | null = null;

  ProductOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  ngOnInit(): void {
    this.paramMapSub = this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('id'));

        let idProduct = param.get('id');

        // logic Api

        this.getSpecificProductSub = this._ProductsService
          .getSpecificProduct(idProduct)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.productDetails = res.data;
            },
          });
      }
    });
  }

  addProductToCartSub!: Subscription;
  getProduct(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);

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
    this.paramMapSub?.unsubscribe();
    this.getSpecificProductSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addProducttoWishSub?.unsubscribe();
  }
}
