import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogtypeService {
  http:any;
  baseApiUrl=environment.baseUrl;

  constructor(private Http:HttpClient) { }
  getErrorLogType(){
    return this.Http.get<any>(this.baseApiUrl+"api/Log/GetErrorLogDetails")
   }
   getActivityLogType(){
    return this.Http.get<any>(this.baseApiUrl+"api/Log/GetActivityLogDetails")
   }
}
