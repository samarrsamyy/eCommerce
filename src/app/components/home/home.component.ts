import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CarouselModule,
    RouterLink,
    TranslateModule,
    CurrencyPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  getAllProductsSub!: Subscription;
  getAllCategoriesSub!: Subscription;

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _WishListService = inject(WishListService);


  // productList: Iproduct[] = [];
  // categoryList: ICategory[] = [];

  productList: WritableSignal<Iproduct[]> = signal([]);
  categoryList: WritableSignal<ICategory[]> = signal([]);

  CategoryOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  CategoryOptionsMain: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this.getAllCategoriesSub = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          this.categoryList.set(res.data);
        },
      });

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data)
        this.productList.set(res.data);
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
    this.getAllProductsSub?.unsubscribe();
    this.getAllCategoriesSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addProducttoWishSub?.unsubscribe();
  }
}
