import {Component, OnInit} from '@angular/core';

import {HelpDeskService} from '../../services/help-desk/help-desk.service';

@Component({
  selector: 'app-helpdesk-detail',
  templateUrl: './helpdesk-detail.page.html',
  styleUrls: ['./helpdesk-detail.page.scss'],
})
export class HelpdeskDetailPage implements OnInit {

  constructor(
    private helpdeskService: HelpDeskService
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.helpdeskService.passedHelpdesk) {
      history.back();
    }


  }

}
