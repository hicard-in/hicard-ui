import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingComponent } from './setting/setting.component';
import { UserComponent } from './user/user.component';
import { LandingComponent } from './landing/landing.component';
import { LoadingComponent } from './loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SettingLinkComponent } from './setting-link/setting-link.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxVcardModule } from "ngx-vcard";
import { ShopComponent } from './shop/shop.component';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PrivacyPolicyComponent } from './brand/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './brand/about-us/about-us.component';
import { ContactUsComponent } from './brand/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './brand/terms-and-conditions/terms-and-conditions.component';
import { CancellationAndRefundPoliciesComponent } from './brand/cancellation-and-refund-policies/cancellation-and-refund-policies.component';
import { FooterComponent } from './footer/footer.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrComponent } from './qr/qr.component';
import { CallbackComponent } from './callback/callback.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingComponent,
    UserComponent,
    LandingComponent,
    LoadingComponent,
    SettingLinkComponent,
    SignupComponent,
    ShopComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsAndConditionsComponent,
    CancellationAndRefundPoliciesComponent,
    FooterComponent,
    QrComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    NgxVcardModule,
    MatButtonToggleModule,
    MatButtonModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
