import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Constants } from '../../common/constants';

import { IonicSelectableComponent } from 'ionic-selectable';

import {CommonService} from '../../services/common/common.service';
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
import { SearchConditions } from './../../interfaces/search-conditions';

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

  selectedSubject: string;
  selectedProvince: Province;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: ProjectAction;
  selectedHelpDeskCategory: string;

  searchByActionConditions: SearchConditions;
  resultHelpDesks: Array<HelpDesk>;

  constructor(
    private element: ElementRef,
    private platform: Platform,
    private commonService: CommonService,
    private subjectService: SubjectService,
    private projectService: ProjectService,
    private helpdeskService: HelpDeskService,
    private router: Router
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
    this.resultHelpDesks = new Array<HelpDesk>();
  }

  ionViewDidEnter() {
    this.platform.ready().then((readySource) => {
      this.unsubscribeBackEvent =
        this.platform.backButton.subscribeWithPriority(999999, () => {
          navigator['app'].exitApp();
        });
    });

    this.projectService.passedProject = null;
    return this.initData();
  }

  async initData() {
    this.subjectList = await this.subjectService.getListSubject().toPromise();
    this.provinces = await this.subjectService.getProvince().toPromise();
    this.provinces.forEach(item => {
      item.post_title = item.title.rendered;
    });
    this.projects = await this.projectService.getListProject().toPromise();
    this.projectActions = await this.subjectService.getProjectAction().toPromise();
    this.helpDeskCategories = await this.helpdeskService.getListHelpDeskCategory().toPromise();
    this.helpdesks = await this.helpdeskService.getListHelpDesk().toPromise();
  }

  onselectProvince() {
    if (!this.selectedProvince) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryDistrict = { province_id: this.selectedProvince.id };
    this.subjectService
      .getDistrictByProvince(dataQueryDistrict)
      .subscribe((districts: Array<District>) => {
        this.districts = districts;
      });
  }

  onselectDistrict() {
    if (!this.selectedDistrict) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dataQueryWard = { district_id: this.selectedDistrict };
    this.subjectService
      .getWardsByDistrict(dataQueryWard)
      .subscribe((wards: Array<Ward>) => {
        this.wards = wards;
      });
  }

  onselectProject(project: Project) {
    this.projectService.passedProject = project;
    this.router.navigateByUrl(Constants.routerLinks.projectDetail);
  }

  onclickHelpDesk(helpdesk: HelpDesk) {
    this.helpdeskService.helpdeskDetail = helpdesk;
    this.router.navigateByUrl(Constants.routerLinks.helpdeskDetail);
  }

  // projectActionChange(event: {component: IonicSelectableComponent; value: any}) {
  //   console.log('projectActionChange value:', event.value);
  // }

  // provinceChange(event: {component: IonicSelectableComponent; value: any}) {
  //   console.log('projectActionChange value:', event.value);
  // }

  async doSearchByAction(){
    this.searchByActionConditions = {
      subject_type: this.selectedSubject,
      province: this.selectedProvince,
      district: this.selectedDistrict,
      wards: this.selectedWard,
      action: this.selectedProjectAction.ID,
      helpdesk_category: this.selectedHelpDeskCategory,
    };

    this.resultHelpDesks = await this.helpdeskService.getListHelpDesk(this.searchByActionConditions).toPromise();
    this.helpdeskService.helpdeskSearchResult = this.resultHelpDesks;
    this.router.navigateByUrl(Constants.routerLinks.searchResult);
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
