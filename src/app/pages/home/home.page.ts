import { District } from './../../interfaces/district';
import { Province } from './../../interfaces/province';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Subject } from './../../interfaces/subject';
import { SubjectService } from './../../services/subject/subject.service';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  toolbarText: string;
  unsubscribeBackEvent: any;
  subjectList: Array<Subject>;
  districts: Array<District>;
  provinces: Array<Province>;
  selectedProvince: string;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.toolbarText = null;
    this.subjectList = new Array<Subject>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
  }

  ionViewDidEnter() {
    this.platform.ready().then((readySource) => {
      this.unsubscribeBackEvent =
        this.platform.backButton.subscribeWithPriority(999999, () => {
          navigator['app'].exitApp();
        });
    });

    return this.initData();
  }

  async initData() {
    this.subjectList = await this.subjectService.getListSubject().toPromise();
    this.provinces = await this.subjectService.getProvince().toPromise();
  }

  onSelectProvince() {
    if (!this.selectedProvince) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryDistrict = { province_id: this.selectedProvince };
    this.subjectService
      .getDistrictByProvince(dataQueryDistrict)
      .subscribe((districts: Array<District>) => {
        this.districts = districts;
      });
  }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }

  scrollContent(event) {
    this.toolbarText = null;
    const cardList = this.element.nativeElement.querySelectorAll('.card-item');
    this.toolbarText =
      Constants.scrollContentGetBlogTitle(event.detail.scrollTop, cardList) ||
      this.toolbarText;
  }
}
