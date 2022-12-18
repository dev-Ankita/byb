import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { LogtypeService } from 'src/app/service/logtype.service';
import { Settings } from 'src/app/utility/settings';

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.component.html',
  styleUrls: ['./activitylog.component.scss']
})
export class ActivitylogComponent implements OnInit {
  activitylogdata: any;
  newactivitylogdata: any;
  startDate:any;
  endDate:any;
  selectedDateRangeValue: Date[];


  constructor(private logservice:LogtypeService, private router:Router) {
    Settings.CurrentUrl.next(this.router.url);
    this.startDate = moment(new Date()).subtract(6,'days').format('DD MMM YYYY');
    this.endDate = moment(new Date()).format('DD MMM YYYY');
    this.selectedDateRangeValue = [new Date(this.startDate), new Date(this.endDate)];
   }

  async ngOnInit(): Promise<void> {
    await this.getActivityLogDetails()
  }
  async getActivityLogDetails() {    
    await lastValueFrom(this.logservice.getActivityLogType()).then((res)=>{
      this.activitylogdata = res.result;
      this.newactivitylogdata = this.activitylogdata;      
    })
    
    .catch((err)=>{

    });

  }
  searchTableDataList(event: any) {
    if (event.target.value != '' || event.target.value != undefined) {
      let searchKeyword = event.target.value;
      searchKeyword = searchKeyword.toLowerCase();
      this.newactivitylogdata = [];
      this.activitylogdata.forEach((item: any) => {
        let propValueList: any = Object.values(item);
        for (let i = 0; i < propValueList.length; i++) {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
              this.newactivitylogdata.push(item);
              break;
            }
          }
        }
      });
    }


  }
  onValueChange(event:any)
  {
    this.selectedDateRangeValue = event;
    this.startDate = moment(this.selectedDateRangeValue[0]).format('DD MMM YYYY');
    this.endDate = moment(this.selectedDateRangeValue[1]).format('DD MMM YYYY');
    
  }

}
class ActivityLogData {
  logId!: 0;
  logDescription!: string;
  createdOn!: Date;
  userEmail!: string;


}
