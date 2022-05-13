import {Injectable} from '@angular/core';
import {ApiService} from '../core-api/api.service';
import {AuthService} from '../auth/auth.service';
import {SuggestionParam} from '../../interfaces/suggestion-param';
import {Constants} from '../../common/constants';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(
    private apiService: ApiService,
    private authService: AuthService) {
  }
  public submitSuggestion(suggestion: SuggestionParam){
    return this.apiService.post(Constants.apiRestEndPoints.suggestion, suggestion, {headers: this.authService.getNoAuthHeader()}, 'submitSuggestion');
  }
}
