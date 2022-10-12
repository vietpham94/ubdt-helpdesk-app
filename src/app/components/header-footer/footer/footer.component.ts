import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Constants} from '../../../common/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  active: string;

  constructor(
    private router: Router,
  ) {
    try {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        const currentPageInfo = Constants.getPageInfoByRouterLink(event.urlAfterRedirects);
        switch (currentPageInfo?.title) {
          case Constants.pagesTitle.home:
            this.active = 'home-active';
            break;
          case Constants.pagesTitle.search:
            this.active = 'search-active';
            break;
          case Constants.pagesTitle.suggestion:
            this.active = 'suggestion-active';
            break;
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  navigateTo(routerLink: string) {
    this.active = routerLink?.length > 0 ? routerLink + '-active' : 'home-active';
    try {
      this.router.navigateByUrl(routerLink);
    } catch (e) {
      console.error(e.message);
    }
  }

}
