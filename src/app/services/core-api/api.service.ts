import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {CommonService} from '../common/common.service';

import {Constants} from '../../common/constants';
import {HttpOptions} from '../../interfaces/http-options';
import {LoginResponse} from '../../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {
  }

  /**
   * CALL API BY GET METHOD
   *
   * @param url
   * @param operation
   */
  get(url: string, httpOptions?: HttpOptions, operation?: string): Observable<any> {
    return this.httpClient.get<any>(url, httpOptions).pipe(
      tap(_ => console.log(operation)),
      catchError(this.handleError<any>(operation))
    );
  }

  /**
   * CALL API BY POST METHOD
   *
   * @param url
   * @param data
   * @param httpOptions
   * @param operation
   */
  post(url: string, data: any, httpOptions?: HttpOptions, operation?: string): Observable<any> {
    return this.httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError<any>(operation))
    );
  }

  /**
   * CALL API BY PUT METHOD
   *
   * @param url
   * @param data
   * @param httpOptions
   * @param operation
   */
  put(url: string, data: any, httpOptions?: HttpOptions, operation?: string): Observable<any> {
    return this.httpClient.put(url, data, httpOptions).pipe(
      tap(_ => console.log(operation)),
      catchError(this.handleError<any>(operation))
    );
  }

  /**
   * CALL API BY DELETE METHOD
   *
   * @param url
   * @param httpOptions
   * @param operation
   */
  delete(url: string, httpOptions?: HttpOptions, operation?: string): Observable<any> {
    return this.httpClient.delete<any>(url, httpOptions).pipe(
      tap(_ => console.log(operation)),
      catchError(this.handleError<any>(operation))
    );
  }

  /**
   * handleError
   *
   * @param operation
   * @param result
   * @private
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.message);
      console.log(operation);
      let errorMsg = error.error.message;
      if (error.status === 403 || error.status === 401) {
        errorMsg = Constants.messages.errorForbidden;
      }

      this.commonService.presentAlert(Constants.messages.errorTitle, errorMsg).then(() => {
        if (!localStorage.getItem(Constants.authKey)) {
          return this.cleanData();
        } else {
          return this.refreshToken();
        }
      });
      return of(result as T);
    };
  }

  /**
   * Refresh access_token
   *
   * @private
   */
  private refreshToken() {
    try {
      const authData: LoginResponse = JSON.parse(localStorage.getItem(Constants.authKey));
      if (!authData.refresh_token) {
        return this.cleanData();
      }

      const options = {
        headers: new HttpHeaders({
          'Accept': '*/*',
          'Content-Type': 'application/json'
        })
      };

      this.post(Constants.apiRestEndPoints.refreshToken, {token: authData.refresh_token}, options, 'Refresh token').subscribe((data) => {
        authData.access_token = data.access_token;
        localStorage.removeItem(Constants.authKey);
        localStorage.setItem(Constants.authKey, JSON.stringify(authData));
        location.href = '/';
      });
    } catch (e) {
      console.error(e.message);
      this.cleanData();
    }
  }

  /**
   * Clear data localStorage
   *
   * @private
   */
  private cleanData() {
    localStorage.removeItem(Constants.authKey);
  }
}
