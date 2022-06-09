import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation/ngx';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {RecaptchaModule} from 'ng-recaptcha';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule],

  providers: [
    SplashScreen,
    ScreenOrientation,
    AuthGuardService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
