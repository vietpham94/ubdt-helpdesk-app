import {Component, Input} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

import {PageInfo} from '../../../interfaces/page-info';
import {Constants} from '../../../common/constants';
import {ProjectService} from '../../../services/project/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() title: string;
  currentPageInfo: PageInfo;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    try {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
        this.currentPageInfo = Constants.getPageInfoByRouterLink(event.urlAfterRedirects);
        // eslint-disable-next-line no-cond-assign
        if (this.currentPageInfo.pageLink === Constants.pageLink.projectDetail && this.projectService.passedProject) {
          this.currentPageInfo.title = this.projectService.passedProject.acf.project_number;
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
