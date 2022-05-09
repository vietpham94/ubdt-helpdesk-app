import { Province } from './../../interfaces/province';
import { District } from './../../interfaces/district';
import { Ward } from './../../interfaces/ward';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { IonicSelectableComponent } from 'ionic-selectable';

import { Subject } from './../../interfaces/subject';
import { SubjectService } from './../../services/subject/subject.service';
import { Constants } from '../../common/constants';
import { ProjectAction } from 'src/app/interfaces/project-action';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  toolbarText: string;
  unsubscribeBackEvent: any;
  subjectList: Array<Subject>;
  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  projectActions: Array<ProjectAction>;
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: string;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    // private ionicSelectable: IonicSelectableComponent,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.toolbarText = null;
    this.subjectList = new Array<Subject>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
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
    this.projectActions = await this.subjectService.getProjectAction().toPromise();
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

  onSelectDistrict() {
    if (!this.selectedDistrict) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryWard = { district: this.selectedDistrict };
    this.subjectService
      .getWardsByDistrict(dataQueryWard)
      .subscribe((wards: Array<Ward>) => {
        this.wards = wards;
      });
  }

  projectActionChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('projectActionChange value:', event.value);
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
