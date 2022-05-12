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
  ) {
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
