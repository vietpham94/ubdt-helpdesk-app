import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

import {SplashScreen} from '@awesome-cordova-plugins/splash-screen/ngx';
import {ScreenOrientation} from '@awesome-cordova-plugins/screen-orientation/ngx';

import {Constants} from './common/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private splashScreen: SplashScreen,
    private router: Router,
  ) {
    this.splashScreen.show();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(r => {
      this.splashScreen.hide();
      return this.router.navigateByUrl(Constants.routerLinks.home);
    }).catch(() => this.router.navigateByUrl(Constants.routerLinks.home));
  }
}
