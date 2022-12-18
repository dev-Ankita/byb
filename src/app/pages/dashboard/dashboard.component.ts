import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { MessagingService } from 'src/app/service/messaging.service';
import { UserService } from 'src/app/service/user.service';
import { Settings } from 'src/app/utility/settings';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userImage = "";
  username: any;
  userDesignation: any;
  userDetails: any;
  url: string = "";
  showNotification!: boolean;
  noofNotifications = 0;
  isNotificationVisible = false;
  notifications: any = [];
  userId: any;
  menu: any;
  message: any;


  constructor(private messagingservice: MessagingService, private router: Router, private localStorage: LocalstorageService, private userservice: UserService, private messageService: MessagingService) {
    this.getMenu();
    // this.messageService.receiveMessage();
    this.userDetails = this.localStorage.getItem('userDetail');
    this.userDetails = JSON.parse(this.userDetails);
    this.username = this.userDetails.firstname + ' ' + this.userDetails.lastname;
    Settings.CurrentUrl.subscribe((val: any) => {
      this.url = val;
      this.getActiveMenuByUrl(this.url);
    });

    // Settings.NotificationDetails.subscribe((notifications) => {
    //   this.noofNotifications = notifications?.length;
    //   this.notifications = notifications;
    // });
    // Settings.NotificationDetails.subscribe((res: any) => {
    //   this.notifications = res;
    // });
  }

  ngOnInit() {
    // this.messagingservice.generateToken();
    // this.messagingservice.receiveMessage();
    // this.message = this.messagingservice.currentMessage;
  }

  getMenu() {
    this.menu = Settings.Menu;
  }

  toggleNotificationPanel() {
    this.isNotificationVisible = !this.isNotificationVisible;
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }
  getActiveMenuByUrl(url: any) {
    if (url != '') {
      (this.menu as Array<any>).forEach((menu, i) => {
        this.menu[i]['isActive'] = (url.includes(menu.url)) ? true : false;
      });
    }
  }

  changeActiveMenuStatus(menuItem: any) {
    (this.menu as Array<any>).forEach((val, i) => {
      this.menu[i]['isActive'] = (i == (this.menu.indexOf(menuItem))) ? true : false;
    });
  }

  changeActiveSubMenuStatus(submenu: any) {
    (this.menu as Array<[]>).forEach((subMenus: any, i) => {
      if (subMenus.submenu.length > 0) {
        subMenus.submenu.forEach((subMenu: any, index: any) => {
          this.menu[i].submenu[index]['isActive'] = (this.menu[i].submenu.indexOf(submenu) == index) ? true : false;
        })
      }
    });
  } 

  async signOut() {
    var tokenDetails = 
    {
      userId: Number(this.localStorage.getUserId()),
      userToken: this.localStorage.getUserToken(),
      "isExpired": true
    };
    var result = ((await lastValueFrom(this.userservice.userSignOut(tokenDetails)))?.result);

    LoaderService.showLoader();
    this.localStorage.removeItem('isAuth');
    this.localStorage.removeItem('bearertoken');
    this.localStorage.removeItem('userid');
    LoaderService.hideLoader();
    this.router.navigate(['/login']);
  }

}