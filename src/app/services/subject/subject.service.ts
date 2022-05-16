import { Injectable } from '@angular/core';

import { AuthService } from './../auth/auth.service';
import { Constants } from './../../common/constants';
import { ApiService } from './../core-api/api.service';
import { NavParams } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private _args: Array<any>;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public getListSubject() {
    return this.apiService.get(Constants.apiRestEndPoints.subject, {
      headers: this.authService.getAuthHeader,
    });
  }
}
