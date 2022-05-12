import {Injectable} from '@angular/core';

import {Project} from '../../interfaces/project';
import {ApiService} from '../core-api/api.service';
import {Constants} from '../../common/constants';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _passedProject: Project

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  public getListHelpDeskCategory() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskCategory, {
      headers: this.authService.getAuthHeader
    });
  }

  public getListHelpDesk() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader
    });
  }

  public getListProject() {
    return this.apiService.get(Constants.apiRestEndPoints.project, {
      headers: this.authService.getAuthHeader,
      params: {parent:0, 'filter[orderby]':'project_munber', order:'asc'}
    });
  }

  public projectDetail(projectId: string) {
    return this.apiService.get(Constants.apiRestEndPoints.projectDetail + '/' + projectId, {
      headers: this.authService.getNoAuthHeader(),
    });
  }

  public get passedProject(): Project {
    return this._passedProject;
  }

  public set passedProject(value: Project) {
    this._passedProject = value;
  }
}
