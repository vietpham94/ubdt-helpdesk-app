import { Injectable } from '@angular/core';

import { Project } from '../../interfaces/project';
import { ApiService } from '../core-api/api.service';
import { Constants } from '../../common/constants';
import { AuthService } from '../auth/auth.service';
import { ProjectParams } from '../../interfaces/project-params';
import { HelpDeskService } from '../help-desk/help-desk.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private _passedProject: Project;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public getListProject(params?: ProjectParams) {
    if (!params) {
      params = { parent: 0, 'filter[orderby]': 'project_munber', order: 'asc' };
    }

    return this.apiService.get(Constants.apiRestEndPoints.project, {
      headers: this.authService.getAuthHeader,
      params: params,
    });
  }

  public projectDetail(projectId: string) {
    return this.apiService.get(
      Constants.apiRestEndPoints.projectDetail + '/' + projectId,
      {
        headers: this.authService.getNoAuthHeader(),
      }
    );
  }

  public get passedProject(): Project {
    return this._passedProject;
  }

  public set passedProject(value: Project) {
    this._passedProject = value;
  }
}
