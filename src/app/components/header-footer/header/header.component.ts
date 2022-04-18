import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

import {PageInfo} from '../../../interfaces/page-info';
import {Constants} from '../../../common/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  currentPageInfo: PageInfo;

  constructor(
    private router: Router
  ) {
    try {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.currentPageInfo = Constants.getPageInfoByRouterLink(event.urlAfterRedirects);
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
