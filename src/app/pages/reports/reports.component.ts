import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { elementAt, lastValueFrom } from 'rxjs';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { UserService } from 'src/app/service/user.service';
import { Settings } from 'src/app/utility/settings';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  newuserlist: any;
  columnHeaders: any;
  filteredUserList: any[] | undefined;
  searchTerm: any;
  term: any;
  booleanValue: any;
  candidatedataset: any;
  updateuserlist: any;
  noOfWorkTypes: any;
  noOfPreferredWorkTypes: [] = [];
  categories: any;
  pieChartOption: Highcharts.Options = {};
  currentPageNumber: number = 1;
  totalPages: number = 0;
  rowCount: number = 20;
  bybCandidateDetailsCount = 0;
  bybCandidateDetailsInfoCount = 0;
  filterrequest: any[] = [];
 
  sidebarShow: boolean = false;
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true
  };
 
  candidateFilterForm = new FormGroup({
    candidateName: new FormControl(''),
    AppliedFor: new FormControl(''),
    Experience: new FormControl(''),
    Skills: new FormControl(''),
    worktype: new FormControl(''),
    location: new FormControl(''),
    referredby: new FormControl('')
  });
  filterbutton: boolean = true;
  startDate:any;
  endDate:any;
  selectedDateRangeValue: Date[];
  


  columnChartOption: Highcharts.Options = {};
  data?: Date;
  newpersonalinfo: any;
  candidatepersonalinfo: any;


  constructor(private jobtypeservice: JobtypesService,private router:Router, private localStorage: LocalstorageService,private userservice:UserService) { 
    this.startDate = moment(new Date()).subtract(6,'days').format('DD MMM YYYY');
    this.endDate = moment(new Date()).format('DD MMM YYYY');
    this.selectedDateRangeValue = [new Date(this.startDate), new Date(this.endDate)];
  }

  
   
  async ngOnInit() {
    LoaderService.showLoader();
    await this.getNoOfPreferredWorkTypeColumnChart();
    await this.getNoOfWorkTypePieChart();
    await this.getBybCandidateDetailsTotalPageCount();
    await this.getCandidateDetailsInfoTotalPageCount();
    Settings.CurrentUrl.next(this.router.url);
    LoaderService.hideLoader();
  }

  async getNoOfWorkTypePieChart() {
    this.noOfWorkTypes = ((await lastValueFrom(this.jobtypeservice.getNoOfWorkType())).result as Array<any>).map((m: any) => ({ name: m.preferredWorkType, y: m.noOfWorkType }));
    this.pieChartOption = {
      chart: {
        plotBackgroundColor: undefined,
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        height: 80 + '%'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            connectorColor: 'silver'
          },
          showInLegend: true,
          colors: ['#26A9BE', '#535353']
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: 'Share',
        data: this.noOfWorkTypes
      }]
    };

    Highcharts.chart("pieChart", this.pieChartOption);
  }
  async getNoOfPreferredWorkTypeColumnChart() {
    var seriesData: any[] = [];
    this.noOfPreferredWorkTypes = ((await lastValueFrom(this.jobtypeservice.getNoOfPreferredJobType()))?.result);
    this.categories = this.noOfPreferredWorkTypes.map((m: any) => m.date);
    var jobTypes = this.noOfPreferredWorkTypes.map((m: any) => Object.keys(m)).flat(1).filter(function (e: any, i: any, s: any) { return i === s.indexOf(e) }).slice(1);

    jobTypes.forEach((jt: any) => {
      var data: any[] = []
      this.noOfPreferredWorkTypes.forEach((element: any[]) => {
        data.push(element[jt]);
      });
      seriesData.push({ name: jt, data: data });
    });


    this.columnChartOption = {
      chart: {
        type: 'column',
        height: 80 + '%'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: this.categories,
        crosshair: true,
        allowDecimals: false
      },
      yAxis: {
        title: {
          useHTML: true,
          text: ''
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      },
      series: seriesData
    };

    Highcharts.chart("columnChart", this.columnChartOption);
  }  

  async getBybCandidateDetailsTotalPageCount() {
    var res = (await lastValueFrom(this.jobtypeservice.getBybCandidateDetailsTotalPageCount()))?.result;
    this.totalPages = Math.round(res / this.rowCount);
    this.bybCandidateDetailsCount=res;    
  }

  async getCandidateDetailsInfoTotalPageCount() {
    var res = (await lastValueFrom(this.jobtypeservice.getCandidateInformationTotalPageCount()))?.result;
    this.totalPages = Math.round(res / this.rowCount);
    this.bybCandidateDetailsInfoCount=res
 
    
  }
}