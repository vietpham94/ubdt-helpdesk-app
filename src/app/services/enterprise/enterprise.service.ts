import {Injectable} from '@angular/core';

import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';

import {Constants} from '../../common/constants';
import {SearchConditions} from '../../interfaces/search-conditions';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  getListEnterprise(params?: SearchConditions) {
    return this.apiService.get(Constants.apiRestEndPoints.enterprise, {
      headers: this.authService.getNoAuthHeader(),
      params: params
    }, 'getListEnterprise');
  }
}
