import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HelpDeskService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  public getListHelpDeskCategory() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdeskCategory, {
      headers: this.authService.getAuthHeader
    });
  }

  public getListHelpDesk() {
    return this.apiService.get(Constants.apiRestEndPoints.helpdesk, {
      headers: this.authService.getAuthHeader
    });
  }
}
