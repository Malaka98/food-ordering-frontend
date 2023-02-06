import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _url: string = environment.BASE_URL

  constructor(private _http: HttpClient) {
  }

  getAllFoods() {
    return this._http.get<any>(`${this._url}/food`)
  }

  getFoodById(foodId: string) {
    return this._http.get<any>(`${this._url}/food/${foodId}`)
  }
}
