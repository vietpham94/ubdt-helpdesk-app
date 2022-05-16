import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';
import { HelpDesk } from 'src/app/interfaces/help-desk';

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {

  private _helpdeskSearchResult: Array<HelpDesk>;
  private _helpdeskDetail: HelpDesk;


  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  public getListHelpDeskCategory() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskCategory, {
      headers: this.authService.getAuthHeader
    });
  }

  // public getListHelpDesk() {
  //   return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
  //     headers: this.authService.getAuthHeader
  //   });
  // }

  public getListHelpDesk(data?) {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader,
      params: data
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
