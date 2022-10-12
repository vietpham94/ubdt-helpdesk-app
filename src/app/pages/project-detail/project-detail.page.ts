import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SubjectService} from '../../services/subject/subject.service';
import {ProjectService} from './../../services/project/project.service';
import {HelpDeskService} from '../../services/help-desk/help-desk.service';
import {ProjectActionService} from '../../services/project-action/project-action.service';
import {AdministrativeService} from '../../services/administrative/administrative.service';
import {EnterpriseService} from '../../services/enterprise/enterprise.service';

import {Constants} from '../../common/constants';
import {Project} from '../../interfaces/project';
import {Ward} from '../../interfaces/ward';
import {Province} from '../../interfaces/province';
import {District} from '../../interfaces/district';
import {HelpDesk} from '../../interfaces/help-desk';
import {ProjectAction} from '../../interfaces/project-action';
import {ProjectParams} from '../../interfaces/project-params';
import {SearchConditions} from '../../interfaces/search-conditions';
import {HelpDeskCategory} from '../../interfaces/help-desk-category';
import {ProjectActionParams} from '../../interfaces/project-action-params';
import {Enterprise} from '../../interfaces/enterprise';
import {PositionService} from '../../services/position/position.service';
import {Position} from '../../interfaces/position';

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
  locationId: number;
  positionList: Array<Position>;
  enterpriseList: Array<Enterprise>;
  enterpriseGroupByPosition: Array<{ position: Position; enterprises: Array<Enterprise> }>;

  isLoadingSubProject: boolean;
  isLoadingProjectAction: boolean;
  isLoadingHelpdeskContent: boolean;
  isShowSelectSubProjectAndAction: boolean;
  isLoadingDistrict: boolean;
  isLoadingWard: boolean;
  isLoadingEnterprise: boolean;

  constructor(
    private projectService: ProjectService,
    private projectActionService: ProjectActionService,
    private helpdeskService: HelpDeskService,
    private router: Router,
    private subjectService: SubjectService,
    private administrativeService: AdministrativeService,
    private enterpriseService: EnterpriseService,
    private positionService: PositionService,
  ) {
  }

  ngOnInit() {
    this.isShowSelectSubProjectAndAction = true;
    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();
    this.helpdeskCategories = new Array<HelpDeskCategory>();
    this.helpdeskContents = new Array<HelpDesk>();
    this.helpdeskGroupByCategory = new Array<{ category: HelpDeskCategory; helpdesk: Array<HelpDesk> }>();
    this.provinces = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
    this.positionList = new Array<Position>();
    this.enterpriseList = new Array<Enterprise>();
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

    this.getListProvince();

    this.getListSubProject();

    this.getListHelpdeskCategories();

    this.getListPosition();

    this.getListEnterprise();
  }

  onSelectSubProject() {
    this.projectAction = null;
    this.actionList = new Array<ProjectAction>();
    this.projectActionId = null;

    if (!this.subProjectId) {
      return;
    }

    this.subProject = this.subProjectList.find(u => u.id == +this.subProjectId);

    this.getListHelpDeskContents();

    this.getLisProjectAction();

    this.getListEnterprise();
  }

  onSelectProjectAction(projectAction: ProjectAction) {
    if (!projectAction) {
      return;
    }

    this.projectActionId = projectAction.ID;

    this.getListHelpDeskContents();

    this.getDetailProjectAction();

    this.getListEnterprise();
  }

  onClickHelpdesk(helpdesk: HelpDesk) {
    this.helpdeskService.passedHelpdesk = helpdesk;
    this.router.navigateByUrl(Constants.routerLinks.helpdeskDetail);
  }

  onSelectProvince(province: Province) {
    this.districts = new Array<District>();
    this.getListDistrict(+province.id);
    this.locationId = +province.id;
    this.getListEnterprise();
  }

  onSelectDistrict(district: District) {
    this.wards = new Array<Ward>();
    this.getListWard(+district.ID);
    this.locationId = +district.ID;
    this.getListEnterprise();
  }

  onSelectWard(ward: Ward) {
    this.locationId = +ward.ID;
    this.getListEnterprise();
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
      for (let i = 0; i < helpdeskTerms?.length; i++) {
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
    this.administrativeService.getProvince({page: 1, per_page: 100}).subscribe((provinces: Array<Province>) => {
      this.provinces = provinces;
      this.provinces.forEach(province => {
        if (province.title) {
          province.post_title = province.title.rendered;
        }
      });
    });
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

  private getListPosition() {
    this.positionService.getListPosition().subscribe((positionList: Array<Position>) => {
      this.positionList = positionList;
    });
  }

  private getListEnterprise() {
    let paramsGetListEnterprise: SearchConditions;

    if (this.projectActionId) {
      paramsGetListEnterprise = {action: this.projectActionId}
    }

    if (!paramsGetListEnterprise && this.subProjectId) {
      paramsGetListEnterprise = {project: this.subProjectId};
    }

    if (!paramsGetListEnterprise && this.project) {
      paramsGetListEnterprise = {project: this.project.id.toString()};
    }

    if (!paramsGetListEnterprise) {
      return;
    }

    if (this.locationId) {
      paramsGetListEnterprise.location = this.locationId.toString();
    }

    this.isLoadingEnterprise = true;
    this.enterpriseGroupByPosition = new Array<{ position: Position; enterprises: Array<Enterprise> }>();
    this.enterpriseService.getListEnterprise(paramsGetListEnterprise).subscribe((enterpriseList: Array<Enterprise>) => {
      this.enterpriseList = enterpriseList;
      this.groupEnterpriseByPosition();
      this.isLoadingEnterprise = false;
    });
  }

  private groupEnterpriseByPosition() {
    if (!this.positionList.length) {
      return;
    }

    if (!this.enterpriseList.length) {
      return;
    }

    if (this.positionList.length == 0) {
      return;
    }

    if (this.enterpriseList.length == 0) {
      return;
    }

    this.positionList.forEach(position => {
      this.enterpriseGroupByPosition.push({
        position: position,
        enterprises: new Array<Enterprise>()
      });
    });

    this.enterpriseList.forEach(enterprise => {
      const positionGroup = this.enterpriseGroupByPosition.find(u => +u.position.id == +enterprise.position.ID);
      if (positionGroup) {
        positionGroup.enterprises.push(enterprise);
      }
    });
  }
}
