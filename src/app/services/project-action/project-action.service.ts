import {Injectable} from '@angular/core';

import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';
import {ProjectActionParams} from '../../interfaces/project-action-params';
import {Constants} from '../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectActionService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  public getListProjectAction(params?: ProjectActionParams) {
    return this.apiService.get(Constants.apiRestEndPoints.projectAction, {
      headers: this.authService.getNoAuthHeader(),
      params: params
    }, 'getListProjectAction');
  }
}
