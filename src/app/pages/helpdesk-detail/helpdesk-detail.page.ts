import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {HelpDeskService} from '../../services/help-desk/help-desk.service';

import {HelpDesk} from '../../interfaces/help-desk';

@Component({
  selector: 'app-helpdesk-detail',
  templateUrl: './helpdesk-detail.page.html',
  styleUrls: ['./helpdesk-detail.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HelpdeskDetailPage implements OnInit {

  helpdesk: HelpDesk;
  helpHtmlContent: SafeHtml;
  isLoadHelpHtmlContent: boolean;

  constructor(
    private helpdeskService: HelpDeskService,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.helpdeskService.passedHelpdesk) {
      history.back();
    }

    this.helpdesk = this.helpdeskService.passedHelpdesk;

    this.isLoadHelpHtmlContent = true;
    this.helpdeskService.getHelpdeskHtmlContent(+this.helpdesk.ID).subscribe((helpdeskHtmlContent: string) => {
      this.helpHtmlContent = this._sanitizer.bypassSecurityTrustHtml(helpdeskHtmlContent);
      this.isLoadHelpHtmlContent = false;
    });
  }


}
