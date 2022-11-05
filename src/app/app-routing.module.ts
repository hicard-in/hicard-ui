import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { LandingComponent } from './landing/landing.component';
import { SettingLinkComponent } from './setting-link/setting-link.component';
import { SignupComponent } from './signup/signup.component';


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
    "path": "setting/:id",
    component: SettingLinkComponent
  },
  {
    "path": ":id",
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
