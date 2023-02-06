import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {FoodService} from "../../services/food.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  private _foodId!: string
  food!: object
  totalPrice: number = 0

  constructor(private _router: Router, private _activeRoute: ActivatedRoute,
              private _notification: NzNotificationService, private _foodService: FoodService) {
  }

  navigateHandler() {
    this._router.navigate(["dashboard/checkout"]).then()
  }

  ngOnInit(): void {
    //   const routeParams = this._activeRoute.snapshot.paramMap
    //   if (routeParams.get("foodId")) {
    //     this._foodId = <string>routeParams.get("foodId")
    //     this._foodService.getFoodById(this._foodId).subscribe({
    //       next: value => {
    //         this.food = value.message
    //         console.log("***************", this.food)
    //       },
    //       error: err => {
    //         this._notification.create(
    //           'error',
    //           'Network Error',
    //           `Bad Request: ${err.message}`
    //         )
    //       }
    //     })
    //   } else {
    //     this._notification.create(
    //       'error',
    //       'Internal Error',
    //       "Food Id not found"
    //     )
    //   }
  }

  getTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice
  }
}
