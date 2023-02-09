import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CartService} from "../../../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  cart: Array<any> = []
  totalPrice: number = 0
  @Output() totalPriceEvent = new EventEmitter<number>();

  constructor(private _cartService: CartService, private _notification: NzNotificationService) {
  }

  ngOnInit(): void {
    try {
      this._cartService.getCurrentCart()
      this._cartService.getCartListener().subscribe({
        next: value => {
          this.cart = value.cart
          this.totalPriceEvent.emit(value.totalPrice);
        },
        error: err => {
          this._notification.create(
            'error',
            'Network Error',
            `Bad Request: ${err.message}`
          )
        }
      })
    } catch (e: any) {
      this._notification.create(
        'error',
        'Network Error',
        `Bad Request: ${e.message}`
      )
    }
  }

  deleteItem(itemName: string) {
    try {
      this._cartService.deleteItem(itemName)
      this._notification.create(
        'info',
        'Cart',
        "Item Deleted"
      )
    } catch (e: any) {
      this._notification.create(
        'error',
        'Network Error',
        `Bad Request: ${e.message}`
      )
    }
  }

  onSelectHandler(item: any, qty: string) {
    this._cartService.addToCart(item.id.toString(), Number(qty))
    this._notification.create(
      'info',
      'Cart',
      "Change Cart Item"
    )
  }
}

// this._cartService.getCart().subscribe({
//   next: value => {
//     this.cart = value.message.cart
//     this.totalPriceEvent.emit(value.message.totalPrice);
//     console.log(this.cart)
//   },
//   error: err => {
//     this._notification.create(
//       'error',
//       'Network Error',
//       `Bad Request: ${err.message}`
//     )
//   }
// })
