import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {LoginComponent} from './components/login/login.component';
import {SingUpComponent} from './components/sing-up/sing-up.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {AdminChatComponent} from './components/admin-chat/admin-chat.component';
import {ChatComponent} from './components/chat/chat.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FoodsPageComponent} from './components/foods-page/foods-page.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {CartPageComponent} from './components/cart-page/cart-page.component';
import {CartItemComponent} from './components/cart-page/components/cart-item/cart-item.component';
import {NzMessageModule} from "ng-zorro-antd/message";
import {provideStoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {cartDetailsReducer} from "./store/reducers/cart.reducer";
import {CheckoutPageComponent} from './components/checkout-page/checkout-page.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    HomePageComponent,
    DashboardComponent,
    NavBarComponent,
    AdminChatComponent,
    ChatComponent,
    FoodsPageComponent,
    PageNotFoundComponent,
    CartPageComponent,
    CartItemComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({cartDetail: cartDetailsReducer}, {}),
    NzModalModule,
    NzNotificationModule,
    ReactiveFormsModule,
    NzSkeletonModule,
    NzMessageModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
