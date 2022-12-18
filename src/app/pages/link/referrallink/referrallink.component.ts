import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { async } from '@firebase/util';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-referrallink',
  templateUrl: './referrallink.component.html',
  styleUrls: ['./referrallink.component.scss']
})
export class ReferrallinkComponent implements OnInit {

  uploadExcelForm!: FormGroup;
  uploadFileControl = new FormControl('', [Validators.required]);
  file: any;
  
  emailList:Array<{candidateName:string,mailId:string}>=[];
  emailStatus: any[] = [];

  constructor(private jobTypeService: JobtypesService,private fb: FormBuilder) {
    this.uploadExcelForm = this.fb.group({
      uploadFileControl: this.uploadFileControl
    });
   }

  ngOnInit(): void {
  }

  exportexcel(): void {
    if (this.emailStatus.length > 0) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.emailStatus);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, moment().format("dd-MMM-yyyy-HH-mm")+'_EmailSentStatus.xlsx');
    }
  }


  searchTableList(event: any) {
  }
  uploadFile(event: any) {
    this.file = event.target.files[0];
    this.readExcel();
  }

  readExcel() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      var arrayBuffer = fileReader.result;
      var data = new Uint8Array(arrayBuffer as any);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      if(excelData.length > 0)
      {
        this.emailList = [];
        excelData.forEach((element:any) => {
          console.log(element);
          if(element!=null && element!=undefined)
          {
            this.emailList.push({ candidateName: element.Candidate_Name, mailId: element.Email_Id })
          }
        });
      }
      
      console.log(this.emailList);
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  async sendEmail() {
    
    LoaderService.showLoader();
    var slNo = 0;
    this.emailStatus = [];
    var isSent = (await lastValueFrom(this.jobTypeService.sendEmail(this.emailList)))?.result;

    this.uploadExcelForm.reset();
    LoaderService.hideLoader();

    
  }
}
