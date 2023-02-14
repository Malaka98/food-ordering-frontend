import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {loadScript} from '@paypal/paypal-js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, AfterViewInit {

  cart!: any
  isDisable: boolean = true

  constructor(private _cartService: CartService, private _notification: NzNotificationService, private _router: Router) {
  }

  ngAfterViewInit(): void {
    this._cartService.getCart().subscribe({
      next: value => {
        this.cart = value.message
        if (value.message.cart.length !== 0) this.isDisable = false
        // Load the PayPal JS SDK script
        loadScript({'client-id': "AfW39J4mVf9OixXuEvpQBlTDZ21DnCWRT3cf_KsJiyAHjO1LD1-r1iR4zyNfrT1GolfAD0oCnUPTiBmE"}).then((paypal: any) => {
          // The PayPal JS SDK script has been loaded successfully
          // console.log('PayPal JS SDK script loaded successfully', paypal);
          let router = this._router
          paypal.Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal',
            },
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: value.message.totalPrice,
                    },
                  },
                ],
              });
            },
            onApprove: (data: any, actions: any) => {
              return actions.order.capture().then((details: any) => {
                console.log("PAYMENT DETAIL", details);
              });
            },
            onCancel(data: any) {
              this._notification.create(
                'error',
                'Payment Cancel',
                `Error : ${data}`
              )
              router.navigate(["dashboard/cart-page"]).then()
            },
            onError(err: any) {
              this._notification.create(
                'error',
                'Payment failure',
                `Error : ${err}`
              )
              router.navigate(["dashboard/cart-page"]).then()
            }
          }).render('#paypal-button-container');
        }).catch((err) => {
          // There was an error loading the PayPal JS SDK script
          console.error('Failed to load PayPal JS SDK script', err);
        });
      },
      error: err => {
        this._notification.create(
          'error',
          'Network Error',
          `Bad Request: ${err.message}`
        )
      }
    })

  }

  ngOnInit(): void {

  }
}
