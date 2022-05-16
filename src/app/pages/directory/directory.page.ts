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

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {
  provines: Array<Province>;
  districts: Array<District>;
  wards: Array<Ward>;
  projectAction: Array<ProjectAction>;
  subjectList: Array<Subject>;
  projectList: Array<Project>;
  selecteProvince: string;
  selectedDistrict: string;
  selectedWard: string;
  selectedProjectAction: string;
  selectedProject: string;

  constructor(
    private projectService: ProjectService,
    private administrativeService: AdministrativeService,
    private authService: AuthService,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {
    this.projectList = new Array<Project>();
    this.subjectList = new Array<Subject>();
    this.projectAction = new Array<ProjectAction>();
    this.provines = new Array<Province>();
    this.districts = new Array<District>();
    this.wards = new Array<Ward>();
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
    this.provines = await this.administrativeService.getProvince(directoryParams).toPromise();
    this.districts = await this.administrativeService.getDistrictByProvince(this.selecteProvince).toPromise();
  }

}
