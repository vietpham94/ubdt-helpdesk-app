import { Injectable } from '@angular/core';
import {Constants} from '../../common/constants';
import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';
import {Pagination} from '../../interfaces/pagination';
import {Province} from '../../interfaces/province';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) { }
  public getProvince(data?:Pagination) {
    return this.apiService.get(Constants.apiRestEndPoints.province, {
      headers: this.authService.getAuthHeader, params:data
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
}

