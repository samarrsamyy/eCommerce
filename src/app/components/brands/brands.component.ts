import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,OnDestroy {
  private readonly _BrandsService= inject(BrandsService)


  brandList:WritableSignal<IBrand[]> = signal([])

  getAllBrandsSub!:Subscription

  ngOnInit(): void {
      this._BrandsService.getAllBrands().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.brandList.set(res.data)
        }
      })
  }


ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe()
}

}
