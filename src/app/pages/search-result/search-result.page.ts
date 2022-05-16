import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HelpDeskService} from '../../services/help-desk/help-desk.service';

import {Constants} from '../../common/constants';
import {HelpDesk} from '../../interfaces/help-desk';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.page.html',
  styleUrls: ['./search-result.page.scss'],
})
export class SearchResultPage implements OnInit {
  helpdesks: Array<HelpDesk>;

  constructor(
    private helpdeskService: HelpDeskService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    if (!this.helpdeskService.helpdeskSearchResult) {
      history.back();
    }

    this.helpdesks = this.helpdeskService.helpdeskSearchResult;

  }

  onclickHelpDesk(helpdesk: HelpDesk) {
    this.helpdeskService.passedHelpdesk = helpdesk;
    this.router.navigateByUrl(Constants.routerLinks.helpdeskDetail);
  }

}
