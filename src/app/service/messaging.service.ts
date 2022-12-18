import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'
import { Settings } from '../utility/settings';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
 
  notificationList:any;

  constructor(private angularFireMessaging: AngularFireMessaging, private storage:LocalstorageService) {
  this.angularFireMessaging.messages.subscribe(
  (_messaging:any) => {
  _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  
  }
  )
 

  }

  generateToken() {
   
    return this.angularFireMessaging.requestToken.subscribe(
      (token:any) => {
        if(token!='' && token!=undefined)
        {
           this.storage.saveUserDeviceNotificationToken(token);
          return token;
        }
      },
      (err) => {
        window.alert('Unable to get permission to notify');
        
      }
    );
}
  receiveMessage() {
    this.getNotificationList();
    this.angularFireMessaging.messages.subscribe(
    (payload:any) => {
     
      this.addNotificationToList(payload);
      this.currentMessage.next(payload);
    });    
    }

    getNotificationList()
    {
      Settings.NotificationDetails.subscribe((val)=>{
        this.notificationList = val;
      });
    }

    addNotificationToList(notification:any)
    {
      this.notificationList.push(notification);
      Settings.NotificationDetails.next(this.notificationList);
    }
  
}
