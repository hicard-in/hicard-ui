import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import { LandingComponent } from './landing/landing.component';
import { SettingLinkComponent } from './setting-link/setting-link.component';
import { SignupComponent } from './signup/signup.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './brand/about-us/about-us.component';
import { ContactUsComponent } from './brand/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './brand/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './brand/terms-and-conditions/terms-and-conditions.component';
import { CancellationAndRefundPoliciesComponent } from './brand/cancellation-and-refund-policies/cancellation-and-refund-policies.component';
import { QrComponent } from './qr/qr.component';
import { CallbackComponent } from './callback/callback.component';


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
    "path": "brand/about-us",
    component: AboutUsComponent
  },
  {
    "path": "brand/contact-us",
    component: ContactUsComponent
  },
  {
    "path": "brand/privacy-policy",
    component: PrivacyPolicyComponent
  },
  {
    "path": "brand/terms-and-conditions",
    component: TermsAndConditionsComponent
  },
  {
    "path": "brand/cancellation-and-refund-policies",
    component: CancellationAndRefundPoliciesComponent
  },
  {
    "path": "setting/:category/:id",
    component: SettingLinkComponent
  },
  {
    "path": "callback",
    component: CallbackComponent
  },
  {
    "path": "qr",
    component: QrComponent
  },
  {
    "path": "qr/:id",
    component: QrComponent
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
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
