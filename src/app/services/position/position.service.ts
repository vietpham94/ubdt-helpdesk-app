import {Injectable} from '@angular/core';

import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';

import {Constants} from '../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  getListPosition(params?: any) {
    return this.apiService.get(Constants.apiRestEndPoints.position, {
      headers: this.authService.getNoAuthHeader()
    }, 'getListPosition');
  }
}
