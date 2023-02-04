import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../services/food.service";
import {Food} from "../../shared/food";

@Component({
  selector: 'app-foods-page',
  templateUrl: './foods-page.component.html',
  styleUrls: ['./foods-page.component.css']
})
export class FoodsPageComponent implements OnInit {

  foods: Array<Food> = []
  isLoading: boolean = true

  constructor(private _foodService: FoodService) {
  }

  ngOnInit(): void {
    this._foodService.getAllFoods().subscribe({
      next: (value: any) => {
        value.message.forEach((value: any) => {
          this.foods.push(new Food(value.name, value.price, value.category, value.imgUri, value.description))
        })
        this.isLoading = false
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }


}
