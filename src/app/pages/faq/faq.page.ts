import { Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Constants } from '../../common/constants';

import { IonicSelectableComponent } from 'ionic-selectable';

import { CommonService } from '../../services/common/common.service';
import { ProjectService } from './../../services/project/project.service';
import { ProjectActionService } from './../../services/project-action/project-action.service';
import { FaqService } from './../../services/faq/faq.service';

import { Project } from 'src/app/interfaces/project';
import { ProjectAction } from 'src/app/interfaces/project-action';
import { Faq } from './../../interfaces/faq';
import {FaqParams} from '../../interfaces/faq-params';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  toolbarText: string;
  unsubscribeBackEvent: any;
  faqs: Array<Faq>;
  projects: Array<Project>;
  subProjects: Array<Project>;
  projectActions: Array<ProjectAction>;

  resultFaqs: Array<Faq>;

  selectedProject: Project;
  selectedSubProject: Project;
  selectedProjectAction: ProjectAction;

  isLoadingSubProject: boolean;
  isLoadingProjectAction: boolean;
  isLoadingFaq: boolean;

  faqParams: FaqParams;


  constructor(
    private element: ElementRef,
    private platform: Platform,
    private commonService: CommonService,
    private projectActionService: ProjectActionService,
    private projectService: ProjectService,
    private faqService: FaqService,
    private router: Router
  ) {}

  ngOnInit() {
    this.toolbarText = null;
    this.projects = new Array<Project>();
    this.subProjects = new Array<Project>();
    this.projectActions = new Array<ProjectAction>();
    this.faqs = new Array<Faq>();
    this.resultFaqs = new Array<Faq>();
    this.faqParams = {
      project: '',
      action: '',
      search: '',
      numberposts: 10,
      page: 1,
    }
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
    this.faqs = await this.faqService.getListFaq().toPromise();
    this.projects = await this.projectService.getListProject().toPromise();
    this.projects.forEach(item => {
      item.post_title = item.title.rendered;
    });
    this.projectActions = await this.projectActionService.getListProjectAction().toPromise();
  }

  // private getListDistrict(provinceId: number) {
  //   if (!provinceId) {
  //     return;
  //   }

  //   this.isLoadingDistrict = true;
  //   this.administrativeService.getDistrictByProvince({
  //     province_id: provinceId,
  //     page: 1,
  //     per_page: 100
  //   }).subscribe((districts: Array<District>) => {
  //     this.districts = districts;
  //     this.isLoadingDistrict = false;
  //   });
  // }


  onSelectProject(project: Project) {
    this.subProjects = new Array<Project>();
    this.projectActions = new Array<ProjectAction>();
    this.getListSubProject(+project.id);
    this.getListProjectAction(+project.id);
  }

  onSelectSubProject(project: Project) {
    this.projectActions = new Array<ProjectAction>();
    this.getListProjectAction(+project.id);
  }

  onSelectProjectAction(projectAction: ProjectAction){

  }

  doSearchFaq(){
    this.isLoadingFaq = true;

    if (this.selectedSubProject){
      this.faqParams.project = this.selectedSubProject.id.toString();
    } else if (this.selectedProject){
      this.faqParams.project = this.selectedProject.id.toString();
    }

    if (this.selectedProjectAction) {
      this.faqParams.action = this.selectedProjectAction.ID.toString();
    }

    this.faqService.getListFaq(this.faqParams).subscribe((faqs: Array<Faq>) => {
      this.faqs = faqs;
      this.isLoadingFaq = false;
    });

  }

  onclickFaq(item: Faq){
    this.faqService.passedFaq = item;
    this.router.navigateByUrl(Constants.routerLinks.faqDetail);
  }

  private getListSubProject(projectId: number) {
    if (!projectId) {
      return;
    }

    this.isLoadingSubProject = true;
    this.projectService.getListProject({
      parent: projectId,
      page: 1,
      per_page: 100,
      'filter[orderby]': 'project_munber',
      order: 'asc'
    }).subscribe((subProjects: Array<Project>) => {
      this.subProjects = subProjects;
      this.subProjects.forEach(item => {
        item.post_title = item.title.rendered;
      });
      this.isLoadingSubProject = false;
    });
  }

  private getListProjectAction(projectId: number) {
    if (!projectId) {
      this.isLoadingProjectAction = true;
      this.projectActionService.getListProjectAction({
        page: 1,
        per_page: 200
      }).subscribe((projectActions: Array<ProjectAction>) => {
        this.projectActions = projectActions;
        this.isLoadingProjectAction = false;
      });
    }else{
      this.isLoadingProjectAction = true;
      this.projectActionService.getListProjectAction({
        project: projectId,
        page: 1,
        per_page: 200
      }).subscribe((projectActions: Array<ProjectAction>) => {
        this.projectActions = projectActions;
        this.isLoadingProjectAction = false;
      });
    }
  }


  // async doSearchFaq(){
  //   this.searchByActionConditions = {
  //     subject_type: this.selectedSubject?this.selectedSubject.toString():'',
  //     province: this.selectedProvince?this.selectedProvince.id.toString():'',
  //     district: this.selectedDistrict?this.selectedDistrict.ID.toString():'',
  //     ward: this.selectedWard?this.selectedWard.ID.toString():'',
  //     action: this.selectedProjectAction?this.selectedProjectAction.ID.toString():'',
  //     helpdesk_category: this.selectedHelpDeskCategory?this.selectedHelpDeskCategory:'',
  //     page: 1,
  //     numberposts: 100
  //   };

  //   this.resultHelpDesks = await this.helpdeskService.getListHelpDesk(this.searchByActionConditions).toPromise();
  //   this.helpdeskService.helpdeskSearchResult = this.resultHelpDesks;
  //   this.router.navigateByUrl(Constants.routerLinks.searchResult);
  // }

  ionViewDidLeave() {
    this.unsubscribeBackEvent.unsubscribe();
  }
}
