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

}
