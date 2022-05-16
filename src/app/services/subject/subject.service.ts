import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';
import { NavParams } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  private _args: Array<any>;

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
      headers: this.authService.getAuthHeader,
      params:{'per_page':100, 'orderby':'title', 'order':'asc'}
    });
  }

  public getDistrictByProvince(data) {
    if (data) {
      this._args = [];
      this._args.push(data);
      //this._args.push({'per_page':100, 'orderby':'title', 'order':'asc'})
    };

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
