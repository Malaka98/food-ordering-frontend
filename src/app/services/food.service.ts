import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _url: string = environment.BASE_URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control': 'max-age=3600' // cache for 1 hour
    })
  };

  constructor(private _http: HttpClient) {
  }

  getAllFoods() {
    return this._http.get<any>(`${this._url}/food`)
  }

  getFoodById(foodId: string) {
    return this._http.get<any>(`${this._url}/food/${foodId}`)
  }
}
