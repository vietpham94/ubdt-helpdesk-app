import {Component, OnInit} from '@angular/core';

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

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {

  project: Project;
  subProject: Project;
  projectAction: ProjectAction;
  subProjectList: Array<Project>;
  actionList: Array<ProjectAction>;
  helpdeskCategories: Array<HelpDeskCategory>;
  helpdeskContents: Array<HelpDesk>;
  helpdeskGroupByCategory: Array<{category: HelpDeskCategory, helpdesk: Array<HelpDesk>}>;

  constructor(
    private projectService: ProjectService,
    private projectActionService: ProjectActionService,
    private helpdeskService: HelpDeskService
  ) {
  }

  ngOnInit() {
    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();
    this.helpdeskCategories = new Array<HelpDeskCategory>();
    this.helpdeskContents = new Array<HelpDesk>();
    this.helpdeskGroupByCategory = new Array<{category: HelpDeskCategory; helpdesk: Array<HelpDesk>}>();
  }

  ionViewDidEnter() {
    if (!this.projectService.passedProject) {
      history.back();
    }

    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();

    this.project = this.projectService.passedProject;

    this.getListSubProject();

    this.getListHelpdeskCategories();

    this.getListHelpDeskContents();
  }

  private getListSubProject() {
    if (!this.project) {
      return;
    }

    const subProjectParams: ProjectParams = {
      parent: this.project.id,
      'filter[orderby]': 'project_munber',
      order: 'asc'
    }
    this.projectService.getListProject(subProjectParams).subscribe((subProjectList: Array<Project>) => {
      this.subProjectList = subProjectList;

      if (subProjectList.length == 0) {
        this.getLisProjectAction();
      }
    });
  }

  private getLisProjectAction() {
    let projectActionParams: ProjectActionParams;

    if (this.subProject) {
      projectActionParams = {
        project: this.subProject.id
      }
    }

    if (!projectActionParams && this.project) {
      projectActionParams = {
        project: this.project.id
      }
    }

    if (!projectActionParams) {
      return;
    }

    projectActionParams.per_page = -1;

    this.projectActionService.getListProjectAction(projectActionParams).subscribe((actionList: Array<ProjectAction>) => {
      this.actionList = actionList;
    });
  }

  private getListHelpdeskCategories() {
    this.helpdeskService.getListHelpDeskCategory().subscribe((helpdeskCategories: Array<HelpDeskCategory>) => {
      this.helpdeskCategories = helpdeskCategories;
    });
  }

  private getListHelpDeskContents() {
    const params: SearchConditions = {
      project: this.project.id.toString()
    }

    this.helpdeskService.getListHelpDesk(params).subscribe((helpDeskContents: Array<HelpDesk>) => {
      this.helpdeskContents = helpDeskContents;
    });
  }
}
