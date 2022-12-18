import { BehaviorSubject } from 'rxjs';

export class Settings {

  public static CurrentUrl: BehaviorSubject<string> = new BehaviorSubject('');
  public static NotificationDetails:BehaviorSubject<any> = new BehaviorSubject([]);

  public static Menu = 
  [
    {
      menu: 'DashBoard', url: '/dashboard/reports', isActive: true,
      submenu: []
    },
    {
      menu: 'Configuration', url: '/dashboard/configuration', isActive: false,
      submenu: [
        { menu: 'Add Skill', url: '/dashboard/configuration/skills', isActive: true },
        { menu: 'Add Job Vacancy', url: '/dashboard/configuration/job-vacancy', isActive: false }
      ]
    },
    {
      menu: 'Logs', url: '/dashboard/logs', isActive: false,
      submenu: [
        { menu: 'Acivity Logs', url: '/dashboard/logs/activitylog', isActive: true },
        { menu: 'Error Logs', url: '/dashboard/logs/errorlog', isActive: false }
      ]
    },
    {
      menu: 'Link', url: '/dashboard/link', isActive: false,
      submenu: [
        { menu: 'Referral Link', url:'/dashboard/link/referrallink', isActive: true }
       
      ]
    }
  ]

  public static reset() {
  }
}
