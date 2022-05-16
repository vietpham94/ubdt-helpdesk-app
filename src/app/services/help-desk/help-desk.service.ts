import {Injectable} from '@angular/core';

<<<<<<< HEAD
import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';
import { HelpDesk } from 'src/app/interfaces/help-desk';
=======
import {AuthService} from './../auth/auth.service';
import {Constants} from './../../common/constants';
import {ApiService} from './../core-api/api.service';

import {SearchConditions} from '../../interfaces/search-conditions';
import {HelpDesk} from '../../interfaces/help-desk';
>>>>>>> develop

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {

<<<<<<< HEAD
  private _helpdeskSearchResult: Array<HelpDesk>;
  private _helpdeskDetail: HelpDesk;

=======
  private _passedHelpdesk: HelpDesk;
>>>>>>> develop

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

<<<<<<< HEAD
  // public getListHelpDesk() {
  //   return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
  //     headers: this.authService.getAuthHeader
  //   });
  // }

  public getListHelpDesk(data?) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader,
      params: data
=======
  public getListHelpDesk(params?: SearchConditions) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader,
      params: params
>>>>>>> develop
    });
  }

  public get helpdeskSearchResult(): Array<HelpDesk> {
    return this._helpdeskSearchResult;
  }

  public set helpdeskSearchResult(value: Array<HelpDesk>) {
    this._helpdeskSearchResult = value;
  }

  public get helpdeskDetail(): HelpDesk {
    return this._helpdeskDetail;
  }

  public set helpdeskDetail(value: HelpDesk) {
    this._helpdeskDetail = value;
  }

}
