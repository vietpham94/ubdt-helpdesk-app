import {Injectable} from '@angular/core';

import {AuthService} from './../auth/auth.service';
import {Constants} from './../../common/constants';
import {ApiService} from './../core-api/api.service';

import {SearchConditions} from '../../interfaces/search-conditions';
import {HelpDesk} from '../../interfaces/help-desk';

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {

  private _passedHelpdesk: HelpDesk;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  get passedHelpdesk(): HelpDesk {
    return this._passedHelpdesk;
  }

  set passedHelpdesk(value: HelpDesk) {
    this._passedHelpdesk = value;
  }

  public getListHelpDeskCategory() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskCategory, {
      headers: this.authService.getAuthHeader
    });
  }

  public getListHelpDesk(params?: SearchConditions) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader,
      params: params
    });
  }
}
