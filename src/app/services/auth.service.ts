import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url = "http://localhost:4000/api"

  constructor(private _http: HttpClient) {
  }

  login(credentials: any) {
    return this._http.post<any>(`${this._url}/user/login`, credentials, {withCredentials: true})
  }

  isLogged() {
    return this._http.get<any>(`${this._url}/user`, {withCredentials: true})
  }
}
