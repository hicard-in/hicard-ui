import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { LandingComponent } from './landing/landing.component';
import { SettingLinkComponent } from './setting-link/setting-link.component';
import { SignupComponent } from './signup/signup.component';
import { ShopComponent } from './shop/shop.component';


const routes: Routes = [
  {
    "path": "landing",
    component: LandingComponent
  },
  {
    "path": "login",
    component: LoginComponent
  },
  {
    "path": "setup",
    component: SignupComponent
  },
  {
    "path": "setting",
    component: SettingComponent
  },
  {
    "path": "shop",
    component: ShopComponent
  },
  {
    "path": "setting/:category/:id",
    component: SettingLinkComponent
  },
  {
    "path": ":id",
    component: UserComponent
  },
  {
    "path": "",
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
