import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment.service';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../core/interfaces/token';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { IOrders } from '../../core/interfaces/iorders';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [NgClass, DatePipe, CurrencyPipe ,TranslateModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit , OnDestroy {

  private readonly _PaymentService=inject(PaymentService)


  ordersList: IOrders[] = [{} as IOrders] 

  userId:Token = jwtDecode(localStorage.getItem('userToken')!);

  allmyOrderSub!:Subscription

  ngOnInit(): void {
    this._PaymentService.allmyOrder(this.userId.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.ordersList=res
      }

    })
    //  console.log(this.userId)

  }


  ngOnDestroy(): void {
    this.allmyOrderSub?.unsubscribe()
  }
}
