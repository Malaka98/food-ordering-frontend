import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private _router: Router) {
  }

  navigateHnadler() {
    this._router.navigate(["dashboard/cart-page"])
  }
}
