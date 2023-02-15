import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory!: Array<any>

  constructor(private _cartService: CartService, private _notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this._cartService.getOrderHistory().subscribe({
      next: value => {
        this.orderHistory = value.message
        console.log(this.orderHistory)
      },
      error: err => {
        this._notification.create(
          'error',
          'Network Error',
          `Bad Request: ${err.message}`
        )
      }
    })
  }

}
