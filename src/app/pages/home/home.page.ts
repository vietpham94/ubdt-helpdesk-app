import {Router} from '@angular/router';
import {Component, ElementRef, OnInit} from '@angular/core';
import {LoadingController, Platform} from '@ionic/angular';

import {Constants} from '../../common/constants';

import {CommonService} from '../../services/common/common.service';
import {SubjectService} from './../../services/subject/subject.service';
import {ProjectActionService} from './../../services/project-action/project-action.service';
import {ProjectService} from './../../services/project/project.service';
import {HelpDeskService} from './../../services/help-desk/help-desk.service';
import {AdministrativeService} from '../../services/administrative/administrative.service';

import {Subject} from './../../interfaces/subject';
import {Province} from './../../interfaces/province';
import {District} from './../../interfaces/district';
import {Ward} from './../../interfaces/ward';
import {Project} from 'src/app/interfaces/project';
import {ProjectAction} from 'src/app/interfaces/project-action';
import {HelpDeskCategory} from 'src/app/interfaces/help-desk-category';
import {HelpDesk} from 'src/app/interfaces/help-desk';
import {SearchConditions} from './../../interfaces/search-conditions';

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
  selectedDistrict: District;
  selectedWard: Ward;
  selectedProjectAction: ProjectAction;
  selectedHelpDeskCategory: string;

  searchByActionConditions: SearchConditions;
  resultHelpDesks: Array<HelpDesk>;

  isLoadingSubject: boolean;
  isLoadingHelpDeskCategories: boolean;
  isLoadingSubProject: boolean;
  isLoadingProjectAction: boolean;
  isLoadingHelpdeskContent: boolean;
  isShowSelectSubProjectAndAction: boolean;
  isLoadingDistrict: boolean;
  isLoadingWard: boolean;
  isLoadingEnterprise: boolean;


  constructor(
    private element: ElementRef,
    private platform: Platform,
    private commonService: CommonService,
    private subjectService: SubjectService,
    private projectActionService: ProjectActionService,
    private projectService: ProjectService,
    private helpdeskService: HelpDeskService,
    private administrativeService: AdministrativeService,
    private router: Router,
    private loadingController: LoadingController,
  ) {
  }

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
    this.isLoadingSubject = true;
    this.isLoadingHelpDeskCategories = true;
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

  private initData() {
    this.subjectService.getListSubject().subscribe(subjectList => {
      this.subjectList = subjectList;
      this.isLoadingSubject = false;
    });

    this.helpdeskService.getListHelpDeskCategory().subscribe(helpDeskCategories => {
      this.helpDeskCategories = helpDeskCategories;
      this.isLoadingHelpDeskCategories = false;
    });

    this.administrativeService.getProvince({page: 1, per_page: 100}).subscribe(provinces => {
      provinces.forEach(item => {
        item.post_title = item.title.rendered;
      });
      this.provinces = provinces;
    });

    this.projectService.getListProject().subscribe(projects => {
      this.projects = projects;
    });

    this.projectActionService.getListProjectAction().subscribe(projectActions => {
      this.projectActions = projectActions;
    });

    this.helpdeskService.getListHelpDesk({helpdesk_category: 'van-de-chung'}).subscribe((helpdesks: Array<HelpDesk>) => {
      helpdesks.splice(helpdesks.length - 1, 1);
      this.helpdesks = helpdesks;
    });
  }

  onSelectProvince(province: Province) {
    this.districts = new Array<District>();
    this.getListDistrict(+province.id);
  }

  onSelectDistrict(district: District) {
    this.wards = new Array<Ward>();
    this.getListWard(+district.ID);
  }

  private getListDistrict(provinceId: number) {
    if (!provinceId) {
      return;
    }

    this.isLoadingDistrict = true;
    this.administrativeService.getDistrictByProvince({
      province_id: provinceId,
      page: 1,
      per_page: 100
    }).subscribe((districts: Array<District>) => {
      this.districts = districts;
      this.isLoadingDistrict = false;
    });
  }

  private getListWard(districtId: number) {
    if (!districtId) {
      return;
    }

    this.isLoadingWard = true;
    this.administrativeService.getWardsByDistrict({
      district_id: districtId,
      page: 1,
      per_page: 100
    }).subscribe((wards: Array<Ward>) => {
      this.wards = wards;
      this.isLoadingWard = false;
    });
  }

  onselectProject(project: Project) {
    this.projectService.passedProject = project;
    this.router.navigateByUrl(Constants.routerLinks.projectDetail);
  }

  onclickHelpDesk(helpdesk: HelpDesk) {
    this.helpdeskService.passedHelpdesk = helpdesk;
    this.router.navigateByUrl(Constants.routerLinks.helpdeskDetail);
  }

  async doSearchByAction() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.searchByActionConditions = {
      subject_type: this.selectedSubject ? this.selectedSubject.toString() : '',
      province: this.selectedProvince ? this.selectedProvince.id.toString() : '',
      district: this.selectedDistrict ? this.selectedDistrict.ID.toString() : '',
      ward: this.selectedWard ? this.selectedWard.ID.toString() : '',
      action: this.selectedProjectAction ? this.selectedProjectAction.ID.toString() : '',
      helpdesk_category: this.selectedHelpDeskCategory ? this.selectedHelpDeskCategory : '',
      page: 1,
      numberposts: 9999
    };

    this.resultHelpDesks = await this.helpdeskService.getListHelpDesk(this.searchByActionConditions).toPromise();
    this.helpdeskService.helpdeskSearchResult = this.resultHelpDesks;
    await loading.dismiss();
    this.router.navigateByUrl(Constants.routerLinks.searchResult);
  }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }
}
