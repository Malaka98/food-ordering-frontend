import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Food} from "../../shared/food";
import {CartService} from "../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

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
              private _router: Router) {
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
    console.log("click")
    try {
      this._cartService.addToCart(foodId, 1)
      setTimeout(() => {
        this._message.remove(id);
        this._cartService.getCurrentCart()
        // this._router.navigate(["dashboard/cart-page"]).then()
      }, 2000);
    } catch (e: any) {
      this._notification.create(
        'error',
        'Network Error',
        `Bad Request: ${e.message}`
      )
    }
  }
}
