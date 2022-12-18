import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { Settings } from 'src/app/utility/settings';
import { AgeValidator } from './experiencevalidator';




@Component({
  selector: 'app-job-vacancy',
  templateUrl: './job-vacancy.component.html',
  styleUrls: ['./job-vacancy.component.scss']
})
export class JobVacancyComponent implements OnInit {
  addJobPositionForm: FormGroup;


  status: any;
  newjobdata: any;

  openJobVacancies: any[] = [];
  holdJobVacancies: any[] = [];
  closedJobVacancies: any[] = [];
  isOpen: boolean = true;
  isHold: boolean = true;
  isClosed: boolean = true;


  constructor(private fb: FormBuilder, private jobtypeservice: JobtypesService, private toastr: ToastrService, private router: Router) {
    Settings.CurrentUrl.next(this.router.url);
    this.addJobPositionForm = new FormGroup({
      jobId: new FormControl(0),
      jobDescription: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]+$/)]),
      experiencemin: new FormControl('', [Validators.required, AgeValidator, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      experiencemax: new FormControl('', [Validators.required, AgeValidator, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),

      vacantPositions: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      openingdate: new FormControl('', [Validators.required]),
      closingdate: new FormControl('', [Validators.required]),
      preferredWorkLocation: new FormControl('', Validators.required),
      referredBy: new FormControl('', Validators.required),
      status: new FormControl(0)
    });
  }

  async ngOnInit() {
    await this.populateJobVacancy();
  }

  async populateJobVacancy() {
    LoaderService.showLoader();
    await this.jobVacanciesData();
    LoaderService.hideLoader();
  }

  resetForm() {
    this.addJobPositionForm.reset();
  }

  async jobVacanciesData() {
    var jobVacancies = (await lastValueFrom(this.jobtypeservice.getJobVacncyData()))?.result;
    if (jobVacancies.length > 0) {
      this.openJobVacancies = (jobVacancies as Array<any>).filter((vac) => vac.statusId == 1);
      this.closedJobVacancies = (jobVacancies as Array<any>).filter((vac) => vac.statusId == 2);
      this.holdJobVacancies = (jobVacancies as Array<any>).filter((vac) => vac.statusId == 3);
    }
  }
  async addNewJobVacancy() {
    LoaderService.showLoader();

    var jobPositionData = {
      JobId: this.addJobPositionForm.get('jobId')?.value == null ? 0 : this.addJobPositionForm.get('jobId')?.value,
      JobDescription: this.addJobPositionForm.get('jobDescription')?.value,
      minExp: this.addJobPositionForm.get('experiencemin')?.value,
      maxExp: this.addJobPositionForm.get('experiencemax')?.value,
      noOfPositions: this.addJobPositionForm.get('vacantPositions')?.value,
      openingDate: moment(this.addJobPositionForm.get('openingdate')?.value),
      closingDate: moment(this.addJobPositionForm.get('closingdate')?.value),
      statusId: (this.addJobPositionForm.get('status')?.value == 0 || this.addJobPositionForm.get('status')?.value == null) ? 1 : Number(this.addJobPositionForm.get('status')?.value)

    };

    var result = (await lastValueFrom(this.jobtypeservice.addJobVacancyData(jobPositionData)))?.result;
    LoaderService.hideLoader();
    this.populateJobVacancy();
    this.toastr.success(result);
  }

  editJobVacancy(jobVacancy: any) {

    this.resetForm();
    this.addJobPositionForm.get('jobId')?.setValue(jobVacancy?.jobId);
    this.addJobPositionForm.get('jobDescription')?.setValue(jobVacancy?.jobDescription);
    this.addJobPositionForm.get('experiencemax')?.setValue(jobVacancy?.maxExp);
    this.addJobPositionForm.get('experiencemin')?.setValue(jobVacancy?.minExp);
    this.addJobPositionForm.get('vacantPositions')?.setValue(jobVacancy?.noOfPositions);
    this.addJobPositionForm.get('openingdate')?.setValue(new Date(jobVacancy?.openingDate));
    this.addJobPositionForm.get('closingdate')?.setValue(new Date(jobVacancy?.closingDate));
    this.addJobPositionForm.get('status')?.setValue(jobVacancy?.statusId);

    this.isOpen = jobVacancy?.statusId == 1 ? false : true;
    this.isHold = jobVacancy?.statusId == 3 ? false : true;
    this.isClosed = jobVacancy?.statusId == 2 ? false : true;

  }

  async deleteJobVacancy(jobId: any) {
    var canDelete = window.confirm("Are you sure to delete this Job Vacancy ?");
    if (canDelete) {
      LoaderService.showLoader();
      var result = (await lastValueFrom(this.jobtypeservice.deleteJobVacancyData(jobId)))?.result;
      LoaderService.hideLoader();
      this.populateJobVacancy();
      this.toastr.success(result);
    }
    else {
    }
  }
 




}
