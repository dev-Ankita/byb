import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import * as XLSX from 'xlsx';
import { LoaderService } from 'src/app/service/loader.service';
import * as moment from 'moment';

@Component({
  selector: 'app-candidateinformations',
  templateUrl: './candidateinformations.component.html',
  styleUrls: ['./candidateinformations.component.scss']
})
export class CandidateinformationsComponent implements OnInit {
  candidatepersonalinfo: any;
  booleanValue: any;
  updatecandidateinfodata: any;
  currentPageNumber: number = 1;

  totalPages: number = 0;
  visiblePages:any[]=[];
  rowCount: number = 20;
  updateuserlist: any;
  newuserlist: any;

  sidebarShow: boolean = false;
  filterbutton: boolean = true;
  candidateInformations: any[] = [];

  candidateInfoFilterForm = new FormGroup({
    candidateName: new FormControl(''),
    contactNumber: new FormControl(''),
    emailId: new FormControl(''),
    currentLocation: new FormControl(''),
    pgCollegeName: new FormControl(''),
    pgDegreeName: new FormControl(''),
    pgPercentage: new FormControl(''),
    pgYearOfPassing: new FormControl(''),
    gdCollegeName: new FormControl(''),
    gdDegreeName: new FormControl(''),
    gdPercentage: new FormControl(''),
    gdYearofpassing: new FormControl(''),
    idPercentage: new FormControl(''),
    idYearOfPassing: new FormControl(''),
    sscPercentage: new FormControl(''),
    sscYearOfPassing: new FormControl(''),
  });
  filtercandidateinfolist: any;
  newfiltercandidateinfo: any;

  receivedApplication: any;
  Filteredcandidateinfodata: any;
  receivedCandidateInfo: any;


  constructor(private jobtypeservice: JobtypesService) { }

  async ngOnInit() {
    await this.getCandidatePersonalInformation();
    await this.getCandidateInfoTotalPageCount();
  }

  async getCandidatePersonalInformation() {
    LoaderService.showLoader();
    var paginationDetails = {
      pageNumber: this.currentPageNumber,
      rowCount: this.rowCount
    };
    this.candidateInformations = (await lastValueFrom(this.jobtypeservice.getAllCandidateInformation(paginationDetails)))?.result;
    this.updatecandidateinfodata = this.candidateInformations;
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
    LoaderService.showLoader(); filename
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
  sortColumn(colName: any, boolean: any) {
    if (boolean == true) {
      this.candidateInformations.sort((a: any, b: any) =>
        a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    } else {
      this.candidateInformations.sort((a: any, b: any) =>
        a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;

    }
  }
  searchCandidateInfoDataList(event: any) {
    if (event.target.value != '' || event.target.value != undefined) {
      let searchKeyword = event.target.value;
      searchKeyword = searchKeyword.toLowerCase();
      this.candidateInformations = [];
      this.updatecandidateinfodata.forEach((item: any) => {
        let propValueList: any = Object.values(item);
        for (let i = 0; i < propValueList.length; i++) {
          if (propValueList[i]) {
            if (propValueList[i].toString().toLowerCase().indexOf(searchKeyword) > -1) {
              this.candidateInformations.push(item);
              break;
            }
          }
        }
      });
    }
  }
  async filterCandidateDetails(candidateInfoFilterForm: any) {
    LoaderService.showLoader();
    var filterData = {
      educationaDetailslId: 0,
      candidateId: 0,
      pG_CollegeName: candidateInfoFilterForm?.pgCollegeName,
      pG_Percantage: candidateInfoFilterForm?.pgPercentage,
      pG_DegreeName: candidateInfoFilterForm?.pgDegreeName,
      pG_YearOfPassing: candidateInfoFilterForm?.pgYearOfPassing,
      gD_CollegeName: candidateInfoFilterForm?.gdCollegeName,
      gD_Percantage: candidateInfoFilterForm?.gdPercentage,
      gD_DegreeName: candidateInfoFilterForm?.gdDegreeName,
      gD_YearOfPassing: candidateInfoFilterForm?.gdYearofpassing,
      iD_Percantage: candidateInfoFilterForm?.idPercentage,
      iD_YearOfPassing: candidateInfoFilterForm?.idYearOfPassing,
      ssC_Percantage: candidateInfoFilterForm?.sscPercentage,
      ssC_YearOfPassing: candidateInfoFilterForm?.sscYearOfPassing,
      candidateName: candidateInfoFilterForm?.candidateName,
      emailId: candidateInfoFilterForm?.emailId,
      contactNumber: candidateInfoFilterForm?.contactNumber,
      currentLocation: candidateInfoFilterForm?.currentLocation,

      pagignations: {
        pageNumber: this.currentPageNumber == 0 ? 1 : this.currentPageNumber,
        rowCount: this.rowCount
      }
    }

    this.updatecandidateinfodata = (await lastValueFrom(this.jobtypeservice.getFilterCandidateInfoData(filterData)))?.result;
    this.candidateInformations = this.updatecandidateinfodata
    this.sidebarShow = false;

    LoaderService.hideLoader();
  }
  checkDisabled() {
    if (this.candidateInfoFilterForm.controls.candidateName.value
      || this.candidateInfoFilterForm.controls.contactNumber.value ||
      this.candidateInfoFilterForm.controls.emailId.value ||
      this.candidateInfoFilterForm.controls.currentLocation.value ||
      this.candidateInfoFilterForm.controls.pgCollegeName.value ||
      this.candidateInfoFilterForm.controls.pgDegreeName.value ||
      this.candidateInfoFilterForm.controls.pgPercentage.value ||
      this.candidateInfoFilterForm.controls.pgYearOfPassing.value ||
      this.candidateInfoFilterForm.controls.gdCollegeName.value ||
      this.candidateInfoFilterForm.controls.gdDegreeName.value ||
      this.candidateInfoFilterForm.controls.gdPercentage.value ||
      this.candidateInfoFilterForm.controls.gdYearofpassing.value ||
      this.candidateInfoFilterForm.controls.idPercentage.value ||
      this.candidateInfoFilterForm.controls.idYearOfPassing.value ||
      this.candidateInfoFilterForm.controls.sscPercentage.value ||
      this.candidateInfoFilterForm.controls.sscYearOfPassing.value
    ) {
      return false;
    }
    else {
      return true;
    }
  }
  resetForm() {
    this.candidateInfoFilterForm.reset();
    this.getCandidatePersonalInformation();
    this.sidebarShow = false
  }
  async changePageNumber(selectedPageNumber: any) {
    LoaderService.showLoader();
    if (selectedPageNumber == -1) {
      this.currentPageNumber = this.currentPageNumber == 1 ? 1 : this.currentPageNumber - 1;
    }
    if (selectedPageNumber == 0) {
      this.currentPageNumber = this.currentPageNumber == this.totalPages ? this.totalPages : this.currentPageNumber + 1;
    }
    if (selectedPageNumber != -1 && selectedPageNumber != 0) {
      if(selectedPageNumber== 'prevSet')
      {
        this.currentPageNumber = (this.currentPageNumber==3)?1:this.currentPageNumber - 3;
      }
      else if(selectedPageNumber=='nextSet')
            {
              this.currentPageNumber = (this.totalPages==this.currentPageNumber) ?this.currentPageNumber:this.currentPageNumber + 3;
            }
            else
            {
              this.currentPageNumber = selectedPageNumber <= this.totalPages ? selectedPageNumber : 1;
            }
    }
    await this.getCandidatePersonalInformation();
    this.preparePaginationAlignments(this.totalPages);
    LoaderService.hideLoader();
  }

  async changeVisiblePageCounter(previousNumber:number)
  {

  }
  async changeRowCount(selectedRowCountOption: any) {
    LoaderService.showLoader();
    this.rowCount = selectedRowCountOption.target?.value;
    this.currentPageNumber = 1;
    await this.getCandidateInfoTotalPageCount();
    await this.changePageNumber(this.currentPageNumber);
    await this.getCandidatePersonalInformation();
    LoaderService.hideLoader();
  }
  async getCandidateInfoTotalPageCount() {
    var res = (await lastValueFrom(this.jobtypeservice.getCandidateInformationTotalPageCount()))?.result;
    this.totalPages = Math.ceil(res / this.rowCount);
    this.preparePaginationAlignments(this.totalPages);
  }
  counter(i: number) {
    return new Array(i);
  }
  async exportexcel() {
    if (this.candidateInformations.length > 0) {
      var candidateInformationsExcelData:any = [];
      this.candidateInformations.forEach((info, index) => {
        console.log(info);
        var candidateInfo = {
          CandidateName:info.candidateName, 
          EmailId:info.emailId,
          ContactNumber:info.contactNumber,
          'Permanent Address':'Address: '+info.permAddress1+' '+info.permAddress2+' City: '+info.permCity+' District: '+info.permDistrict+' State: '+info.permState+' PIN: '+info.permPIN,
          'Present Address':'Address: '+info.presAddress1+' '+info.presAddress2+' City: '+info.presCity+' District: '+info.presDistrict+' State: '+info.presState+' PIN: '+info.presPIN,
          CurrentLocation:info.currentLocation,
          PG_CollegeName:info.pG_CollegeName,
          PG_Degree:info.pG_DegreeName,
          PG_Mark:info.pG_Percentage,
          PG_YearOfPassing:info.pG_YearOfPassing,
          Graduation_CollegeName:info.gD_CollegeName,
          Graduation_Degree:info.gD_DegreeName,
          Graduation_Mark:info.gD_Percentage,
          Graduation_YearOfPassing:info.gD_Yearofpassing,
          '12th_Mark':info.iD_Percentage,
          '12th_YearOfPassing':info.iD_YearOfPassing,
          '10th_Mark':info.ssC_Percentage,
          '10th_YearOfPassing':info.ssC_YearOfPassing
        };
        candidateInformationsExcelData.push(candidateInfo);
      });
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(candidateInformationsExcelData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, moment().format("DDMMMyyyyHHmm") + '_CandidateInformations.xlsx');
    }
  }

  preparePaginationAlignments(totalPageCount:number)
  {
    if(totalPageCount >= 3)
    {
      var firstPage = (this.currentPageNumber==1)?1:(totalPageCount==this.currentPageNumber)?this.currentPageNumber-2:this.currentPageNumber-1;
      var secondPage = firstPage+1;
      var thirdPage = (totalPageCount==this.currentPageNumber)?this.currentPageNumber:secondPage+1
      this.visiblePages = [firstPage, secondPage, thirdPage];
    }
  }

  async sendAcknowledgeToAll() {
    var res = (await lastValueFrom(this.jobtypeservice.sendAcknowledgeToAll()))?.result;   
  }

}
