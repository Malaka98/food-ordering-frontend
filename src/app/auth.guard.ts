import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, first, Observable, of} from 'rxjs';
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isLogged().pipe(
      // map(isAuthenticated => {
      //   console.log("Verify " + JSON.stringify(isAuthenticated))
      //   return true
      // }),
      catchError(() => {
        this._router.navigate(['/login']).then();
        return of(false);
      }),
      first()
    )
  }

}
