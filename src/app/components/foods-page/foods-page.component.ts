import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Food} from "../../shared/food";
import {CartService} from "../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  foods: Array<Food> = []
  isLoading: boolean = true

  constructor(private _foodService: FoodService, private _cartService: CartService,
              private _notification: NzNotificationService, private _message: NzMessageService,
              private _router: Router, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this._foodService.getAllFoods().subscribe({
      next: (value: any) => {
        value.message.forEach((value: any) => {
          this.foods.push(new Food(value._id, value.name, value.price, value.category, value.imgUri, value.description))
        })
        this.isLoading = false
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  addToCartHandler(foodId: string): void {
    const id = this._message.loading('Action in progress..', {nzDuration: 0}).messageId;
    try {
      this._authService.isLogged().subscribe({
        next: () => {
          this._cartService.addToCart(foodId, 1)
          setTimeout(() => {
            this._message.remove(id);
            this._cartService.getCurrentCart()
            this._router.navigate(["dashboard/cart-page"]).then()
          }, 1000)
        },
        error: err => {
          this._message.remove(id);
          this._notification.create(
            'error',
            'Error',
            "Please Login the system"
          )
          this._router.navigate(["login"]).then()
        }
      })
    } catch (e: any) {
      this._notification.create(
        'error',
        'Internal Error',
        `Application Error: ${e.message}`
      )
    }
  }
}
