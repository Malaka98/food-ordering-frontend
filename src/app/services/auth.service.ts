import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = environment.BASE_URL

  constructor(private _http: HttpClient) {
  }

  login(credentials: any) {
    return this._http.post<any>(`${this._url}/user/login`, credentials, {withCredentials: true})
  }

  isLogged() {
    return this._http.get<any>(`${this._url}/user`, {withCredentials: true})
  }
}
