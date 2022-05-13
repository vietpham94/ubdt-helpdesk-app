import { Injectable } from '@angular/core';
import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';
import {Pagination} from '../../interfaces/pagination';
import {Constants} from '../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) { }
  public getProjects(data: Pagination){
    return this.apiService.get(Constants.apiRestEndPoints.project, {headers: this.authService.getNoAuthHeader(), params: data});
  }
}
