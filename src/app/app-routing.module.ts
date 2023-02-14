import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SingUpComponent} from "./components/sing-up/sing-up.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AdminChatComponent} from "./components/admin-chat/admin-chat.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthGuard} from "./auth.guard";
import {FoodsPageComponent} from "./components/foods-page/foods-page.component";
import {CartPageComponent} from "./components/cart-page/cart-page.component";
import {CheckoutPageComponent} from "./components/checkout-page/checkout-page.component";

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "home", component: HomePageComponent},
  {path: "login", component: LoginComponent},
  {path: "sing-up", component: SingUpComponent},
  {path: "foods", component: FoodsPageComponent},
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      // {path: "", redirectTo: "/dashboard/order-history", pathMatch: "full"},
      // {path: "order-history", component: OrderHistoryComponent},
      {path: "cart-page", component: CartPageComponent},
      {path: "chat", component: ChatComponent},
      {path: "checkout", component: CheckoutPageComponent},
      {path: '**', component: PageNotFoundComponent}
    ],
    canActivate: [AuthGuard]
  },
  {path: "admin-chat", component: AdminChatComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
