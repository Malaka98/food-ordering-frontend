import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  cartDetail: Observable<any>
  totalPrice: number = 0
  totalItem: number = 0

  constructor(private _router: Router, private _cartService: CartService,
              private _notification: NzNotificationService, private _store: Store<{ cartDetail: any }>) {
    this.cartDetail = _store.select('cartDetail')
  }

  ngOnInit(): void {
    this.cartDetail.subscribe({
      next: value => {
        this.totalPrice = value.subTotal
        this.totalItem = value.totalItem
        if (value.totalItem === 0) {
          this._cartService.getCart().subscribe({
            next: value1 => {
              this.totalItem = value1.message.totalItem
              this.totalPrice = value1.message.totalPrice
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
      },
      error: err => {
        this._notification.create(
          'error',
          'Internal Error',
          `Somthing went wrong ===>>> ${err.message}`
        )
      }
    })
  }

  navigateHandler() {
    this._router.navigate(["dashboard/cart-page"]).then()
  }
}
