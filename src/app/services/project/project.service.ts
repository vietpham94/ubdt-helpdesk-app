import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

  public getProjectDetail(project_id: number) {
    return this.apiService.get(Constants.apiRestEndPoints.project, {
      headers: this.authService.getAuthHeader,
      params: {id:project_id}
    });
  }
}
