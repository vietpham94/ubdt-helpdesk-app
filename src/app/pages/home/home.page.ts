import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Constants } from '../../common/constants';

import { IonicSelectableComponent } from 'ionic-selectable';

import { SubjectService } from './../../services/subject/subject.service';
import { ProjectService } from './../../services/project/project.service';
import { HelpDeskService } from './../../services/help-desk/help-desk.service';

import { Subject } from './../../interfaces/subject';
import { Province } from './../../interfaces/province';
import { District } from './../../interfaces/district';
import { Ward } from './../../interfaces/ward';
import { Project } from 'src/app/interfaces/project';
import { ProjectAction } from 'src/app/interfaces/project-action';
import { HelpDeskCategory } from 'src/app/interfaces/help-desk-category';
import { HelpDesk } from 'src/app/interfaces/help-desk';

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
  projects: Array<Project>;
  projectActions: Array<ProjectAction>;
  helpDeskCategories: Array<HelpDeskCategory>;
  helpdesks: Array<HelpDesk>;
  selectedProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: string;
  selectedHelpDeskCategory: string;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    private subjectService: SubjectService,
    private projectService: ProjectService,
    private helpdeskService: HelpDeskService,
  ) {}

  ngOnInit() {
    this.toolbarText = null;
    this.subjectList = new Array<Subject>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
    this.projects = new Array<Project>();
    this.projectActions = new Array<ProjectAction>();
    this.helpDeskCategories = new Array<HelpDeskCategory>();
    this.helpdesks = new Array<HelpDesk>();
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
    this.projects = await this.projectService.getListProject().toPromise();
    this.projectActions = await this.subjectService.getProjectAction().toPromise();
    this.helpDeskCategories = await this.helpdeskService.getListHelpDeskCategory().toPromise();
    this.helpdesks = await this.helpdeskService.getListHelpDesk().toPromise();
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

  onChooseProject(item){}

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
