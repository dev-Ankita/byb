import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { elementAt, lastValueFrom } from 'rxjs';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-newdashboard',
  templateUrl: './newdashboard.component.html',
  styleUrls: ['./newdashboard.component.scss']
})
export class NewdashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  title: string = "Top 10 Movies";
  userdatalist: UserData[] = [
    { candidatename: 'Swadhinata Samantary', appliedFor: 'Python Developer', skills: 'Java,Python', experience: '3', workType: 'WFO', location: 'Bhubaneswar', referredby: 'Ankita', file: 'me.pdf' },
    { candidatename: 'Ankita Pattanaik', appliedFor: 'BI Developer', skills: 'Java,BI', experience: '1', workType: 'WFO', location: 'Bangolore', referredby: 'Swati', file: 'ilu.png' },
    { candidatename: 'Ram Das', appliedFor: '.net Developer', skills: 'Java,Python,.net', experience: '2', workType: 'WFH', location: 'Delhi', referredby: 'Swadhin', file: 'su.docx' },
    { candidatename: 'Sagar Raj Roul', appliedFor: 'Python Developer', skills: 'Java,Python', experience: '1', workType: 'WFO', location: 'Bhubaneswar', referredby: 'Sraut', file: 'fyi.docx' },
    { candidatename: 'Srishti Das', appliedFor: 'PHP developer', skills: 'Java,Python,PHP', experience: '1', workType: 'WFO', location: 'Delhi', referredby: 'Sneha', file: 'abc.pdf' },
  ]
  userImage = " ";
  username: any;
  userId: any;
  userDetails: any;


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
  receivedApplication: any;
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
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  FilterForm = new FormGroup({
    candidateName: new FormControl(''),
    appliedFor: new FormControl(''),
    experience: new FormControl(''),
    skills: new FormControl(''),
    worktype: new FormControl(''),
    location: new FormControl(''),
    referredby: new FormControl('')
  });
  filterbutton: boolean = true;



  columnChartOption: Highcharts.Options = {};
  newFilterData: any;
  newCandidateFilteredData: any;



  constructor(private jobtypeservice: JobtypesService, private route: Router, private localStorage: LocalstorageService, private userservice: UserService) {
    this.userDetails = this.localStorage.getItem('userDetail')
    this.userDetails = JSON.parse(this.userDetails)
    this.username = this.userDetails.firstname + ' ' + this.userDetails.lastname;
  }



  async ngOnInit() {
    LoaderService.showLoader();
    await this.getAllCandidateData();
    await this.getNoOfPreferredWorkTypeColumnChart();
    await this.getNoOfWorkTypePieChart();
    await this.getCandidateDetailsTotalPageCount();
    await this.populateSkillData();
    LoaderService.hideLoader();
  }

  async populateSkillData() {
    await this.getSkills();
  }

  async getSkills() {
    this.dropdownList = ((await lastValueFrom(this.jobtypeservice.getSkill()))?.result as Array<any>)
      .map((s: any) => ({ item_id: s.skillId, item_text: s.skillName }));
    LoaderService.hideLoader();
  }



  async getAllCandidateData() {
    var candidateData = {
      pageNumer: this.currentPageNumber == 0 ? 1 : this.currentPageNumber,
      rowCount: this.rowCount
    };
    this.jobtypeservice.getAllCandidateList(candidateData).subscribe((res: any) => {
    
      this.updateuserlist = res.result
      this.newuserlist = this.updateuserlist
    })

    console.log(this.newuserlist);


  }

  async getCandidateDetailsTotalPageCount() {
    // var res = (await lastValueFrom(this.jobtypeservice.getCandidateDetailsTotalPageCount()))?.result;
    // this.totalPages = Math.round(res / this.rowCount);
    // this.receivedApplication = res


  }

  async changePageNumber(selectedPageNumber: number) {
    LoaderService.showLoader();
    if (selectedPageNumber == -1) {
      this.currentPageNumber = this.currentPageNumber == 1 ? 1 : this.currentPageNumber - 1;
    }
    if (selectedPageNumber == 0) {
      this.currentPageNumber = this.currentPageNumber == this.totalPages ? this.totalPages : this.currentPageNumber + 1;
    }
    if (selectedPageNumber != -1 && selectedPageNumber != 0) {
      this.currentPageNumber = selectedPageNumber <= this.totalPages ? selectedPageNumber : 1;
    }

    await this.getAllCandidateData();
    LoaderService.hideLoader();
  }

  async changeRowCount(selectedRowCountOption: any) {
    LoaderService.showLoader();
    this.rowCount = selectedRowCountOption.target?.value;
    await this.getCandidateDetailsTotalPageCount();
    await this.changePageNumber(this.totalPages);
    await this.getAllCandidateData();
    LoaderService.hideLoader();
  }

  getCandidateResumeFile(candiateResumeId: number) {
    LoaderService.showLoader();
    this.jobtypeservice.getCandidateResumeFile(candiateResumeId).subscribe((res) => {
      this.downloadFile(res);
      LoaderService.hideLoader();
    },
      (_err) => {
        LoaderService.hideLoader();
      });
  }

  downloadFile(data: any) {
    LoaderService.showLoader();
    var filename = data?.headers.get('content-disposition').split(';')[1].split('filename')[1].split('=')[1].trim();
    const blob = new Blob([data?.body], { type: data?.body.type });
    const url = window.URL.createObjectURL(blob);
    let downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    LoaderService.hideLoader();
  }

  //sorting columns
  sortColumn(colName: any, boolean: any) {
    if (boolean == true) {
      this.newuserlist.sort((a: any, b: any) =>
        a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    } else {
      this.newuserlist.sort((a: any, b: any) =>
        a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;

    }
    console.log(this.booleanValue);

  }
  searchTableDataList(event: any) {
    if (event.target.value != '' || event.target.value != undefined) {
      let searchKeyword = event.target.value;
      searchKeyword = searchKeyword.toLowerCase();
      this.newuserlist = [];
      this.updateuserlist.forEach((item: any) => {
        let propValueList: any = Object.values(item);
        for (let i = 0; i < propValueList.length; i++) {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
              this.newuserlist.push(item);
              break;
            }
          }
        }
      });
    }


  }

  async getNoOfWorkTypePieChart() {
    this.noOfWorkTypes = ((await lastValueFrom(this.jobtypeservice.getNoOfWorkType()))?.result as Array<any>)
      .map((m: any) => ({ name: m.preferredWorkType, y: m.noOfWorkType }));

    console.log(this.noOfWorkTypes);

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
  signOut() {
    this.localStorage.removeItem('isAuth');
    LoaderService.showLoader();

    setTimeout(() => {
      LoaderService.hideLoader();
    }, 2000)
    this.route.navigate(['/login']);
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

  counter(i: number) {
    return new Array(i);
  }

  checkDisabled() {
    if (this.FilterForm.controls.candidateName.value
      || this.FilterForm.controls.appliedFor.value ||
      this.FilterForm.controls.experience.value ||
      this.FilterForm.controls.skills.value ||
      this.FilterForm.controls.worktype.value ||
      this.FilterForm.controls.location.value ||
      this.FilterForm.controls.referredby.value
    ) {
      return false;
    }
    else {
      return true;
    }
  }


  Filter(FilterForm: any) {
    this.filterrequest = [];
    this.newuserlist.forEach((newlist: any) => {
      // console.log(request.candidatename.includes("Ankita"))
      // console.log(newlist.candidateName.includes("Ankita"));


      if (
        (newlist.candidateName == (FilterForm.candidateName == '' ? newlist.candidateName : FilterForm.candidateName)) &&

        (newlist.experienceYears == (FilterForm.Experience == '' ? newlist.experienceYears : Number(FilterForm.Experience))) &&
        (newlist.preferredWorkLocations == (FilterForm.location == '' ? newlist.preferredWorkLocations : FilterForm.location)) &&
        (newlist.jobName == (FilterForm.AppliedFor == '' ? newlist.jobName : FilterForm.AppliedFor)) &&
        (newlist.employeeName.toLowerCase() == (FilterForm.referredby == '' ? newlist.employeeName.toLowerCase() : FilterForm.referredby.toLowerCase())) &&

        (newlist.skills == (FilterForm.Skills == '' ? newlist.skills : FilterForm.Skills)) &&


        (newlist.preferredWorkType.toLowerCase() == (FilterForm.worktype == '' ? newlist.preferredWorkType : FilterForm.worktype))


      ) {
        this.filterrequest.push(newlist);

      }
    });
    console.log(this.filterrequest)
  }
  filteringData(FilterForm: FormGroup) {
    var filterData = {
      candidateId: 0,
      candidateName: this.FilterForm.get('candidateName')?.value,
      preferredWorkType: this.FilterForm.get('worktype')?.value,
      preferredWorkLocations: this.FilterForm.get('location')?.value,
      experienceYears: Number(this.FilterForm.get('experience')?.value),
      referredBy: FilterForm.get('referredby')?.value,
      skills:( FilterForm.get('skills')?.value != "" &&  FilterForm.get('skills')?.value != null) ? ((FilterForm.get('skills')?.value as Array<any>).map(x => x.item_id).slice(0).join(',')) : "",
      appliedFor: FilterForm.get('appliedFor')?.value,
      pagignations: {
        pageNumer: this.currentPageNumber == 0 ? 1 : this.currentPageNumber,
        rowCount: this.rowCount

      }
    }
    this.jobtypeservice.getFilterCandidateData(filterData).subscribe((res: any) => {
      
      // this.newFilterData = res.result
      // this.newCandidateFilteredData=this.newFilterData
      this.updateuserlist = res.result
      this.newuserlist = this.updateuserlist
      this.sidebarShow = false
    })
  }

  //resetfrom
  resetForm() {

    this.FilterForm.reset();
    this.getAllCandidateData();
    this.sidebarShow = false
  }


}


class UserData {
  candidatename!: string;
  appliedFor!: string;
  skills!: string;
  experience!: string;
  workType!: string;
  location!: string;
  referredby!: string;
  file!: string;

}

