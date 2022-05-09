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

  public getProvince() {
    return this.apiService.get(Constants.apiRestEndPoints.province, {
      headers: this.authService.getAuthHeader
    });
  }

  public getDistrictByProvince(data) {
    return this.apiService.get(Constants.apiRestEndPoints.district, {
      headers: this.authService.getAuthHeader,
      params: data
    });
  }

  public getWardsByDistrict(data) {
    return this.apiService.get(Constants.apiRestEndPoints.ward, {
      headers: this.authService.getAuthHeader,
      params: data
    });
  }

  public getProjectAction() {
    return this.apiService.get(Constants.apiRestEndPoints.projectAction, {
      headers: this.authService.getAuthHeader
    });
  }
}
