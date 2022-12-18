import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { elementAt, lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { UserService } from 'src/app/service/user.service';
import { Settings } from 'src/app/utility/settings';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-bybdetails',
  templateUrl: './bybdetails.component.html',
  styleUrls: ['./bybdetails.component.scss']
})
export class BYBdetailsComponent implements OnInit {

  

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
    receivedApplication:any;
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
      await this.getAllCandidateData();
      await this.getCandidateDetailsTotalPageCount();
      await this.populateSkillData();
      Settings.CurrentUrl.next(this.router.url);
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
      var paginationDetails = {
        pageNumber:1,
        rowCount:20
          };
      this.newuserlist = ((await lastValueFrom(this.jobtypeservice.getAllCandidateList(paginationDetails)))?.result as Array<any>);
      this.updateuserlist = this.newuserlist;
      
    }
    
  
  
    async getCandidateDetailsTotalPageCount() {
      var res = (await lastValueFrom(this.jobtypeservice.getBybCandidateDetailsTotalPageCount()))?.result;
      this.totalPages = Math.round(res / this.rowCount);
      this.receivedApplication=res
   
      
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
        this.currentPageNumber = selectedPageNumber <= this.totalPages?selectedPageNumber:1;
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
        (err) => {
          LoaderService.hideLoader();
        });
    }
  
    downloadFile(data: any) {
      LoaderService.showLoader();filename
     
      var filename = data?.headers.get('filename');
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
  
    counter(i: number) {
      return new Array(i);
    }
  
    checkDisabled() {
      if (this.candidateFilterForm.controls.candidateName.value
        || this.candidateFilterForm.controls.AppliedFor.value ||
        this.candidateFilterForm.controls.Experience.value ||
        this.candidateFilterForm.controls.Skills.value ||
        this.candidateFilterForm.controls.worktype.value ||
        this.candidateFilterForm.controls.location.value ||
        this.candidateFilterForm.controls.referredby.value
      ) {
        return false;
      }
      else {
        return true;
      }
    }
  
  
    async filterCandidateDetails(candidateFilterForm: any) {
      LoaderService.showLoader();
      var filterData = {
        candidateId: 0,
        candidateName:candidateFilterForm?.candidateName,
        preferredWorkType:candidateFilterForm?.worktype,
        preferredWorkLocations: candidateFilterForm?.location,
        experienceYears: Number(candidateFilterForm?.Experience),
        referredBy: candidateFilterForm?.referredby, 
        skills:( candidateFilterForm?.Skills != "" &&  candidateFilterForm?.Skills != null) ? ((candidateFilterForm?.Skills as Array<any>).map(x => x.item_id).slice(0).join(',')) : "",
        appliedFor: candidateFilterForm?.AppliedFor,
        pagignations: {
          pageNumber: this.currentPageNumber == 0 ? 1 : this.currentPageNumber,
          rowCount: this.rowCount
  
        }
      }
      this.updateuserlist = (await lastValueFrom(this.jobtypeservice.getFilterCandidateData(filterData)))?.result;
      this.newuserlist = this.updateuserlist
        this.sidebarShow = false;
  
        LoaderService.hideLoader();
    }
  
    
    resetForm() {
  
      this.candidateFilterForm.reset();
      this.getAllCandidateData();
      this.sidebarShow = false
    }
  
    onValueChange(event:any)
    {
      this.selectedDateRangeValue = event;
      this.startDate = moment(this.selectedDateRangeValue[0]).format('DD MMM YYYY');
      this.endDate = moment(this.selectedDateRangeValue[1]).format('DD MMM YYYY');
      
    }
    exportexceldata(): void {
      if (this.newuserlist.length > 0) {
        var bybcandidateExcelData = this.newuserlist;
        bybcandidateExcelData.forEach((info:any, index:any) => {
          
          delete info.resumeId;
          delete info.resumeFilePath;
          delete info.candidateId;
        });
  
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(bybcandidateExcelData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, moment().format("dd-MMM-yyyy-HH-mm") + '_EmailSentStatus.xlsx');
      }
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