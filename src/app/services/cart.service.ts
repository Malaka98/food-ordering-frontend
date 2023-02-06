import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {io, Socket} from "socket.io-client";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _restURL = environment.BASE_URL
  private _url = environment.CART_SOCKET_API
  private socket: Socket;
  cart!: object

  constructor(private _http: HttpClient) {
    this.socket = io(this._url, {transports: ['websocket', 'polling', 'flashsocket'], withCredentials: true});
  }

  addToCart(foodId: string, itemCount: number): void {
    try {
      this.socket.emit("add-item", {foodId, itemCount})
    } catch (e) {
      throw e
    }
  }

  getCart() {
    return this._http.get<any>(`${this._restURL}/cart`, {withCredentials: true})
  }

  getCurrentCart(): void {
    this.socket.emit("get-current-cart")
  }

  getCartListener(): Observable<any> {
    try {
      return new Observable<any>((observable) => {
        this.socket.on("get-cart", (date: any) => {
          this.cart = date
          observable.next(date)
        })
        return () => {
          this.socket.disconnect();
        }
      })
    } catch (e) {
      throw e
    }
  }

  deleteItem(itemName: string): void {
    try {
      this.socket.emit("delete-item", itemName)
    } catch (e) {
      throw e
    }
  }

}
