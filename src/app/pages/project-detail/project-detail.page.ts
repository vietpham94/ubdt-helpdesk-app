import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ProjectService} from './../../services/project/project.service';
import {ProjectActionService} from '../../services/project-action/project-action.service';

import {Project} from '../../interfaces/project';
import {ProjectAction} from '../../interfaces/project-action';
import {ProjectParams} from '../../interfaces/project-params';
import {ProjectActionParams} from '../../interfaces/project-action-params';
import {HelpDesk} from '../../interfaces/help-desk';
import {HelpDeskCategory} from '../../interfaces/help-desk-category';
import {HelpDeskService} from '../../services/help-desk/help-desk.service';
import {SearchConditions} from '../../interfaces/search-conditions';
import {Constants} from '../../common/constants';
import {Province} from '../../interfaces/province';
import {District} from '../../interfaces/district';
import {Ward} from '../../interfaces/ward';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {

  project: Project;
  subProject: Project;
  projectAction: ProjectAction;

  subProjectId: string;
  projectActionId: string;

  subProjectList: Array<Project>;
  actionList: Array<ProjectAction>;
  helpdeskCategories: Array<HelpDeskCategory>;
  helpdeskContents: Array<HelpDesk>;
  helpdeskGroupByCategory: Array<{ category: HelpDeskCategory; helpdesk: Array<HelpDesk> }>;

  provinces: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;

  isLoadingSubProject: boolean;
  isLoadingProjectAction: boolean;
  isLoadingHelpdeskContent: boolean;
  isShowSelectSubProjectAndAction: boolean;

  constructor(
    private projectService: ProjectService,
    private projectActionService: ProjectActionService,
    private helpdeskService: HelpDeskService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.isShowSelectSubProjectAndAction = true;
    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();
    this.helpdeskCategories = new Array<HelpDeskCategory>();
    this.helpdeskContents = new Array<HelpDesk>();
    this.helpdeskGroupByCategory = new Array<{ category: HelpDeskCategory; helpdesk: Array<HelpDesk> }>();
  }

  ionViewDidEnter() {
    if (!this.projectService.passedProject) {
      history.back();
    }

    this.projectAction = null;
    this.helpdeskService.passedHelpdesk = null;

    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();

    this.project = this.projectService.passedProject;

    this.getListSubProject();

    this.getListHelpdeskCategories();
  }

  onSelectSubProject() {
    this.projectAction = null;
    this.actionList = new Array<ProjectAction>();

    if (!this.subProjectId) {
      return;
    }

    this.subProject = this.subProjectList.find(u => u.id == +this.subProjectId);

    this.getListHelpDeskContents();

    this.getLisProjectAction();
  }

  onSelectProjectAction(projectAction: ProjectAction) {
    if (!projectAction) {
      return;
    }

    this.projectActionId = projectAction.ID;

    this.getListHelpDeskContents();

    this.getDetailProjectAction();
  }

  onClickHelpdesk(helpdesk: HelpDesk) {
    this.helpdeskService.passedHelpdesk = helpdesk;
    this.router.navigateByUrl(Constants.routerLinks.helpdeskDetail);
  }

  onSelectProvince(province: Province) {
    console.log(province.id);
  }

  onSelectDistrict(district: District) {
    console.log(district.id);
  }

  onSelectWard(ward: Ward) {
    console.log(ward.id);
  }

  private getListSubProject() {

    if (!this.project) {
      return;
    }

    const subProjectParams: ProjectParams = {
      parent: this.project.id,
      'filter[orderby]': 'project_munber',
      order: 'asc'
    };


    this.isLoadingSubProject = true;
    this.projectService.getListProject(subProjectParams).subscribe((subProjectList: Array<Project>) => {
      this.subProjectList = subProjectList;
      if (subProjectList.length == 0) {
        this.isShowSelectSubProjectAndAction = false;
      }
      this.isLoadingSubProject = false;
    });
  }

  private getLisProjectAction() {
    let projectActionParams: ProjectActionParams;

    if (this.subProjectId) {
      projectActionParams = {
        project: +this.subProjectId
      };
    }

    if (!projectActionParams && this.project) {
      projectActionParams = {
        project: this.project.id
      };
    }

    if (!projectActionParams) {
      return;
    }

    this.isLoadingProjectAction = true;
    this.projectActionService.getListProjectAction(projectActionParams).subscribe((actionList: Array<ProjectAction>) => {
      this.actionList = actionList;
      this.isLoadingProjectAction = false;
    });
  }

  private getListHelpdeskCategories() {
    this.helpdeskService.getListHelpDeskCategory().subscribe((helpdeskCategories: Array<HelpDeskCategory>) => {
      this.helpdeskCategories = helpdeskCategories;
      this.getListHelpDeskContents();
    });
  }

  private getListHelpDeskContents() {
    this.isLoadingHelpdeskContent = true;

    let params: SearchConditions;

    if (this.projectActionId) {
      params = {action: this.projectActionId};
    }

    if (!params && this.subProjectId) {
      params = {project: this.subProjectId};
    }

    if (!params && this.project) {
      params = {project: this.project.id.toString()};
    }

    this.helpdeskService.getListHelpDesk(params).subscribe((helpDeskContents: Array<HelpDesk>) => {
      this.helpdeskContents = helpDeskContents;
      this.groupHelpdeskByCategory();
      this.isLoadingHelpdeskContent = false;
    });
  }

  private groupHelpdeskByCategory() {
    if (this.helpdeskContents.length == 0) {
      return;
    }

    if (this.helpdeskCategories.length == 0) {
      return;
    }

    if (this.helpdeskGroupByCategory.length > 0) {
      this.helpdeskGroupByCategory = new Array<{ category: HelpDeskCategory; helpdesk: Array<HelpDesk> }>();
    }

    this.helpdeskCategories.forEach(helpdesk => {
      this.helpdeskGroupByCategory.push({
        category: helpdesk,
        helpdesk: new Array<HelpDesk>()
      });
    });

    this.helpdeskContents.forEach(helpdesk => {
      const helpdeskTerms = helpdesk.terms;
      for (let i = 0; i < helpdeskTerms.length; i++) {
        const existHelpdeskGroup = this.helpdeskGroupByCategory.find(u => u.category.id == helpdeskTerms[i].term_id);
        if (!existHelpdeskGroup) {
          continue;
        }

        const existHelpdeskInGroup = existHelpdeskGroup.helpdesk.find(u => u.id == helpdesk.id);
        if (!existHelpdeskInGroup) {
          existHelpdeskGroup.helpdesk.push(helpdesk);
        }
      }
    });
  }

  private getDetailProjectAction() {
    if (!this.projectActionId) {
      return;
    }

    this.isLoadingHelpdeskContent = true;
    this.projectActionService.getDetailProjectAction(this.projectActionId).subscribe((projectActionDetail: ProjectAction) => {
      this.projectAction = projectActionDetail;
      this.isLoadingHelpdeskContent = false;
    });
  }

  private getListProvince() {

  }
}
