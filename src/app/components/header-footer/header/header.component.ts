import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Plugins} from '@capacitor/core';
import {IonRouterOutlet, Platform} from '@ionic/angular';

import {PageInfo} from '../../../interfaces/page-info';
import {Constants} from '../../../common/constants';

// eslint-disable-next-line @typescript-eslint/naming-convention
const {App} = Plugins;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  currentPageInfo: PageInfo;

  constructor(
    private router: Router,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet
  ) {
    try {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.currentPageInfo = Constants.getPageInfoByRouterLink(event.urlAfterRedirects);
      });

      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  onClickBack() {
    try {

    } catch (e) {
      console.error(e.message);
    }
  }
}
