import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  private readonly _CategoriesService=inject(CategoriesService)

specificProduct: Iproduct[] =[]

  categoryList:WritableSignal<ICategory[]> = signal([])

  getAllCategoriesSub!:Subscription
  ngOnInit(): void {
      this._CategoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res.data)
          this.categoryList.set(res.data)
        }
      })
  }


ngOnDestroy(): void {
  this.getAllCategoriesSub?.unsubscribe()
    
}


}
