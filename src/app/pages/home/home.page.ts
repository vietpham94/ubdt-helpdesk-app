import {Component, ElementRef, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';

import {Constants} from '../../common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  toolbarText: string;
  unsubscribeBackEvent: any;

  constructor(
    private element: ElementRef,
    private platform: Platform,
  ) {
  }

  ngOnInit() {
    this.toolbarText = null;
  }

  ionViewDidEnter() {
    this.platform.ready().then(readySource => {
      this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(999999, () => {
        navigator['app'].exitApp();
      });
    });
  }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }

  scrollContent(event) {
    this.toolbarText = null;
    const cardList = this.element.nativeElement.querySelectorAll('.card-item');
    this.toolbarText = Constants.scrollContentGetBlogTitle(event.detail.scrollTop, cardList) || this.toolbarText;
  }

}
