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

  private _helpdeskSearchResult: Array<HelpDesk>;
  private _passedHelpdesk: HelpDesk;


  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  public getListHelpDeskCategory() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskCategory, {
      headers: this.authService.getAuthHeader
    }, 'getListHelpDeskCategory');
  }

  public getListHelpDesk(params?: SearchConditions) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader,
      params: params
    }, 'getListHelpDesk');
  }

  public getDetailHelpdesk(helpdeskId: number) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskDetail + helpdeskId, {
      headers: this.authService.getNoAuthHeader()
    }, 'getDetailHelpdesk');
  }

  public getHelpdeskHtmlContent(helpdeskId: number) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskHtmlContent, {
      headers: this.authService.getNoAuthHeader(),
      params: {id: helpdeskId}
    }, 'getDetailHelpdesk');
  }

  get passedHelpdesk(): HelpDesk {
    return this._passedHelpdesk;
  }

  set passedHelpdesk(value: HelpDesk) {
    this._passedHelpdesk = value;
  }
  
  public get helpdeskSearchResult(): Array<HelpDesk> {
    return this._helpdeskSearchResult;
  }

  public set helpdeskSearchResult(value: Array<HelpDesk>) {
    this._helpdeskSearchResult = value;
  }
}
