import {HttpContext, HttpHeaders, HttpParams} from '@angular/common/http';

export interface HttpOptions {
  headers?: HttpHeaders | any;
  context?: HttpContext;
  params?: HttpParams | any;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
