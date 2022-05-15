import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

constructor(
  private apiService: ApiService,
  private authService: AuthService
) { }

  public getListSubject() {
    return this.apiService.get(Constants.apiRestEndPoints.subject, {
      headers: this.authService.getAuthHeader
    });
  }

  public getProjectAction() {
    return this.apiService.get(Constants.apiRestEndPoints.projectAction, {
      headers: this.authService.getAuthHeader
    });
  }
}
