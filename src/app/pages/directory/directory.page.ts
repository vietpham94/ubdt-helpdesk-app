import {Component, OnInit} from '@angular/core';

import {ProjectService} from '../../services/project/project.service';
import {AdministrativeService} from '../../services/administrative/administrative.service';
import {AuthService} from '../../services/auth/auth.service';
import {SubjectService} from '../../services/subject/subject.service';

import {District} from '../../interfaces/district';
import {Province} from '../../interfaces/province';
import {Ward} from '../../interfaces/ward';
import {ProjectAction} from '../../interfaces/project-action';
import {Subject} from '../../interfaces/subject';
import {Project} from '../../interfaces/project';
import {Pagination} from '../../interfaces/pagination';
import {ProjectParams} from '../../interfaces/project-params';
import {ProjectActionParams} from '../../interfaces/project-action-params';
import {ProjectActionService} from '../../services/project-action/project-action.service';
import {PositionService} from '../../services/position/position.service';
import {Position} from '../../interfaces/position';
import {SearchConditions} from '../../interfaces/search-conditions';
import {Enterprise} from '../../interfaces/enterprise';
import {EnterpriseService} from '../../services/enterprise/enterprise.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  project: Project;
  subProject: Project;
  subProjectList: Array<Project>;
  provines: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  projectAction: ProjectAction;
  subjectList: Array<Subject>;
  projectList: Array<Project>;
  actionList: Array<ProjectAction>;
  positionList: Array<Position>;

  subProjectId: string;
  projectActionId: string;
  selecteProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: string;
  selectedProject: string;
  selectedPosition: string;
  selectedSubject: string;
  search: string;

  locationId: number;
  isLoadingEnterprise: boolean;
  isLoadingDistrict: boolean;
  isLoadingWard: boolean;


  enterpriseList: Array<Enterprise>;

  constructor(
    private projectService: ProjectService,
    private administrativeService: AdministrativeService,
    private authService: AuthService,
    private subjectService: SubjectService,
    private projectActionService: ProjectActionService,
    private positionService: PositionService,
    private enterpriseService: EnterpriseService,
  ) {
  }

  ngOnInit() {
    this.subjectList = new Array<Subject>();
    this.provines = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();
    this.positionList = new Array<Position>();
  }

  ionViewDidEnter() {
    return this.initData();
  }

  async initData() {
    const directoryParams: Pagination = {
      page: 1,
      per_page: 100,
    }
    this.projectList = await this.projectService.getListProject().toPromise();
    this.subjectList = await this.subjectService.getListSubject().toPromise();
    this.projectAction = await this.subjectService.getListSubject().toPromise();
    this.subProjectList = new Array<Project>();
    this.actionList = new Array<ProjectAction>();
    this.getListProvince();
    this.getListSubProject();
    this.getListPosition();
    this.getListEnterprise();
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

  onSelectPorject(){
    if(!this.selectedProject){
      return;
    }
    this.getListSubProject();
    this.getLisProjectAction();
  }
  onSelectSubProject() {
    this.projectAction = null;
    this.actionList = new Array<ProjectAction>();
    this.projectActionId = null;
    if (!this.subProjectId) {
      return;
    }
    this.subProject = this.subProjectList.find(u => u.id == +this.subProjectId);
    this.getLisProjectAction();
  }
  onSelectProjectAction(projectAction: ProjectAction) {
    if (!projectAction) {
      return;
    }
    this.projectActionId = projectAction.ID;
  }

  private getListSubProject() {

    if (!this.selectedProject) {
      return;
    }

    const subProjectParams: ProjectParams = {
      parent: +this.selectedProject,
      'filter[orderby]': 'project_munber',
      order: 'asc'
    };
    this.projectService.getListProject(subProjectParams).subscribe((subProjectList: Array<Project>) => {
      this.subProjectList = subProjectList;
    });
  }

  private getLisProjectAction() {
    let projectActionParams: ProjectActionParams;

    if (this.subProjectId) {
      projectActionParams = {
        project: +this.subProjectId
      };
    }

    if (!projectActionParams && this.selectedProject) {
      projectActionParams = {
        project: +this.selectedProject
      };
    }

    if (!projectActionParams) {
      return;
    }

    this.projectActionService.getListProjectAction(projectActionParams).subscribe((actionList: Array<ProjectAction>) => {
      this.actionList = actionList;
    });
  }

  private getListPosition(){
    this.positionService.getListPosition().subscribe((positionList: Array<Position>)=> {
      this.positionList = positionList;
    });
  }
  private getListProvince() {
    this.administrativeService.getProvince({page: 1, per_page: 100}).subscribe((provinces: Array<Province>) => {
      this.provines = provinces;
      this.provines.forEach(province => {
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
  private getListEnterprise() {
    let paramsGetListEnterprise: SearchConditions;
    if(this.search){
      paramsGetListEnterprise = {search: this.search};
    }
    if (this.projectActionId) {
      paramsGetListEnterprise = {action: this.projectActionId};
    }

    if (!paramsGetListEnterprise && this.subProjectId) {
      paramsGetListEnterprise = {project: this.subProjectId};
    }

    if (!paramsGetListEnterprise && this.selectedProject) {
      paramsGetListEnterprise = {project: this.selectedProject};
    }
    if(this.selectedPosition){
      paramsGetListEnterprise = {position: this.selectedPosition};
    }
    if (!paramsGetListEnterprise) {
      return;
    }

    if (this.locationId) {
      paramsGetListEnterprise.location = this.locationId.toString();
    }

    this.isLoadingEnterprise = true;
    this.enterpriseService.getListEnterprise(paramsGetListEnterprise).subscribe((enterpriseList: Array<Enterprise>) => {
      this.enterpriseList = enterpriseList;
      this.isLoadingEnterprise = false;
    });
  }

}
