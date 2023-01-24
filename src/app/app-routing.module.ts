import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SingUpComponent} from "./components/sing-up/sing-up.component";
import {HomePageComponent} from "./components/home-page/home-page.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "sing-up", component: SingUpComponent},
  {path: "home", component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
