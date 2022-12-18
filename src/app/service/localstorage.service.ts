import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  public saveUserToken(token: string) {
    localStorage.setItem('bearertoken', token);
  }
  public getUserToken() {
    return localStorage.getItem('bearertoken');
  }
  public saveUserId(userId: string) {
    localStorage.setItem('userid', userId);
  }
  public getUserId() {
    return localStorage.getItem('userid');
  }
  public getUser() {
    return localStorage.getItem('userDetail');
  }
  public saveUser(credentials: any) {
    localStorage.setItem('userDetail', JSON.stringify(credentials));
  }
  public setItem(key:string,value:any){
    localStorage.setItem(key, value);
  }
  public getItem(key:string){
    return localStorage.getItem(key);
  }

  public removeItem(key:string)
  {
    return localStorage.removeItem(key);
  }

  public saveUserDeviceNotificationToken(token:string){
    return localStorage.setItem('notificationtoken', token );
  }
  public getUserDeviceNotificationToken(){
    return localStorage.getItem('notificationtoken');
  } 

}
 