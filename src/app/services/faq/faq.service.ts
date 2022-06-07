import { Injectable } from '@angular/core';

import { Faq } from '../../interfaces/faq';
import { ApiService } from '../core-api/api.service';
import { Constants } from '../../common/constants';
import { AuthService } from '../auth/auth.service';
import {FaqParams} from '../../interfaces/faq-params';


@Injectable({
  providedIn: 'root',
})

export class FaqService {
  private _passedFaq: Faq;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  public getListFaq(params?: FaqParams) {
    if(!params){
      params = { numberposts: 20, page: 1 };
    }

    return this.apiService.get(Constants.apiRestEndPoints.faq, {
      headers: this.authService.getNoAuthHeader(),
      params: params,
    });
  }

  public get passedFaq(): Faq {
    return this._passedFaq;
  }

  public set passedFaq(value: Faq) {
    this._passedFaq = value;
  }

}
