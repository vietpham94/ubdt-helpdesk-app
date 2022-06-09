import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Constants } from '../../common/constants';

import { IonicSelectableComponent } from 'ionic-selectable';

import { CommonService } from '../../services/common/common.service';

import { FaqService } from './../../services/faq/faq.service';
import { Faq } from './../../interfaces/faq';


@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.page.html',
  styleUrls: ['./faq-detail.page.scss'],
})
export class FaqDetailPage implements OnInit {
  toolbarText: string;
  unsubscribeBackEvent: any;
  faq: Faq;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    private commonService: CommonService,
    private faqService: FaqService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (!this.faqService.passedFaq) {
      history.back();
    }

    this.faq = this.faqService.passedFaq;
  }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }
}
