import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  baseUrl: string | undefined;
  baseApiUrl=environment.baseUrl;
  readonly baseUrltoken=environment.baseUrl

  constructor(private Http:HttpClient) { }
  getUserCredentialData(credentials:any){
    return this.Http.post<any>(this.baseApiUrl+"api/User/GetUserCredentials",credentials)
   }

   isUserSessionValid(credentials:any){
    return this.Http.post<any>(this.baseApiUrl+"api/User/IsUserSessionValid",credentials)
   }

   userSignOut(tokenDetails:any){
    return this.Http.post<any>(this.baseApiUrl+"api/User/SignOut",tokenDetails)
   }
  
}