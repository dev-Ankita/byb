import { Component, HostListener, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { Settings } from 'src/app/utility/settings';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-candidatepersonal-info',
  templateUrl: './candidatepersonal-info.component.html',
  styleUrls: ['./candidatepersonal-info.component.scss']
})
export class CandidatepersonalInfoComponent implements OnInit {
  candidatePersonalForm!: FormGroup;
  name = new FormControl('', [Validators.required, Validators.minLength(1)]);
  contactNo = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  emailId = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]);
  currentLocation = new FormControl('', [Validators.required]);
  collegeName = new FormControl('', []);
  degree = new FormControl('', [])
  percentage = new FormControl('', [Validators.pattern(/^[%.0-9-]+$/)])
  yearOfPassing = new FormControl('', [Validators.pattern(/^[%.0-9-]+$/), Validators.maxLength(4), Validators.minLength(4)]);
  collegeNameGraduation = new FormControl('', [Validators.required]);
  degreeGraduation = new FormControl('', [Validators.required])
  percentageGraduation = new FormControl('', [Validators.required, Validators.pattern(/^[%.0-9-]+$/)])
  yearOfPassingGraduation = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(4), Validators.minLength(4)]);
  percentage12 = new FormControl('', [Validators.required, Validators.pattern(/^[%.0-9-]+$/)]);
  yearOfPassing12 = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(4), Validators.minLength(4)]);
  percentage10 = new FormControl('', [Validators.required, Validators.pattern(/^[%.0-9-]+$/)]);
  yearOfPassing10 = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(4), Validators.minLength(4)]);
  formFile = new FormControl('', [Validators.required, this.validFile.bind(this)]);
  profileImage = new FormControl('', Validators.required);

  permAddress1 = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  permAddress2 = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  permCity = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  permPIN = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(6), Validators.minLength(6)]);
  permDistrict = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  permAState = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  presAddress1 = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  presAddress2 = new FormControl('', [Validators.required, Validators.maxLength(200)]);
  presCity = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  presPIN = new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.maxLength(6), Validators.minLength(6)]);
  presDistrict = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  presAState = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  error!: string;
  dragAreaClass!: string;
  fileName: any;
  myfile: any;
  profilefile: any;
  fileuploadmessage: string = '';
  base64ProfileImageURl: string = '';

  currentDateTime: any;
  startDateTime: any;
  endDateTime: any;
  date: any;

  isalreadyregistered = false;


  constructor(private fb: FormBuilder, private route: Router, private jobtypeservice: JobtypesService, private toastr: ToastrService, private Activatedroute: ActivatedRoute) {
    this.candidatePersonalForm = this.fb.group({
      name: this.name,
      contactNo: this.contactNo,
      emailId: this.emailId,
      currentLocation: this.currentLocation,
      collegeName: this.collegeName,
      degree: this.degree,
      percentage: this.percentage,
      yearOfPassing: this.yearOfPassing,
      formFile: this.formFile,
      collegeNameGraduation: this.collegeNameGraduation,
      degreeGraduation: this.degreeGraduation,
      percentageGraduation: this.percentageGraduation,
      yearOfPassingGraduation: this.yearOfPassingGraduation,
      percentage12: this.percentage12,
      yearOfPassing12: this.yearOfPassing12,
      percentage10: this.percentage10,
      yearOfPassing10: this.yearOfPassing10,
      profileImage: this.profileImage,

      permAddress1: this.permAddress1,
      permAddress2: this.permAddress2,
      permCity: this.permCity,
      permPIN: this.permPIN,
      permDistrict: this.permDistrict,
      permAState: this.permAState,

      presAddress1: this.presAddress1,
      presAddress2: this.presAddress2,
      presCity: this.presCity,
      presPIN: this.presPIN,
      presDistrict: this.presDistrict,
      presAState: this.presAState


    });

    profileImage: this.profilefile;

    this.currentDateTime = moment().format();
    this.startDateTime = moment('2022-12-01T09:00:00').format();
    this.endDateTime = moment('2022-12-06T19:00:00').format();


    setInterval(() => {
      const currentDate = new Date();
      var difference = moment('2022-12-01T09:00:00').diff(moment().format());
      var duration = moment.duration(difference);
      this.date = duration.hours() + ' ' + duration.minutes() + ' ' + duration.seconds();
    }, 1000);

  }

  imageUpload(event: any) {
    const file = event.target.files[0];
    if (event.target.files[0].size < 50001) {
      this.fileuploadmessage = 'image uploaded';
      this.profilefile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profileImage.setValue(reader.result?.toString() ?? '');

      }
    } else {
      this.fileuploadmessage = 'more than enough';
      window.alert('Image should not be more than 50kb.');
    }

  }


  validFile(control: AbstractControl): any {
    var extensions = ['pdf', 'docx']
    if (control.value != null && control.value != '') {
      var ext = control.value.substring(control.value.lastIndexOf('.') + 1)
      if (extensions.includes(ext)) {
        return null;
      }
      control.setValue(null);
      return { 'InvalidExtension': true };
    }
  }

  validFileSize(event: any): any {
    if (event.size > 5 * 1024 * 1024) {
      this.formFile.setValue(null);
      this.candidatePersonalForm.controls['formFile'].setErrors({ 'fileSizeInvalid': true })

    }
  }
  async ngOnInit() {
    var email = this.Activatedroute.snapshot.paramMap.get('emailId');
    if (email != null && email != undefined && email != '') {
      email = email.trim();
      email = atob(email);
      this.candidatePersonalForm.controls['emailId'].setValue(email.trim());
      this.isalreadyregistered = (await (lastValueFrom(this.jobtypeservice.isEmailValid(email))))?.result;
    }


  }
  // @HostListener("dragover", ["$event"]) onDragOver(event: any) {
  //   this.dragAreaClass = "droparea";
  //   event.preventDefault();
  // }
  // @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
  //   this.dragAreaClass = "droparea";
  //   event.preventDefault();
  // }
  // @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
  //   this.dragAreaClass = "dragarea";
  //   event.preventDefault();
  // }
  // @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
  //   this.dragAreaClass = "dragarea";
  //   event.preventDefault();
  // }
  // @HostListener("drop", ["$event"]) onDrop(event: any) {
  //   this.dragAreaClass = event.dataTransfer.files[0].name;
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (this.validateFiles(event.dataTransfer.files)) {
  //     return;
  //   }
  //   this.myfile = event.dataTransfer.files[0];
  //   this.fileName = event.dataTransfer.files[0].name;
  //   this.formFile.setValue(event.dataTransfer.files[0].name);
  // }

  uploadFiles(event: any) {
    this.validateFiles(event.target.files);
    this.myfile = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }

  validateFiles(files: FileList) {
    if (files.length == 0) {
      return false;
    }
    for (let index = 0; index <= files.length; index++) {
      var file = files[index];
      if ((!file.name.includes('docx')) || (!file.name.includes('doc')) || (!file.name.includes('pdf'))) {
        return false;
      }
    }

    return true;
  }

  sameAddress(event:any) {
    if(event.target.checked)
    {
      this.permAddress1.setValue(this.presAddress1.value);
      this.permAddress2.setValue(this.presAddress2.value);
      this.permCity.setValue(this.presCity.value);
      this.permPIN.setValue(this.presPIN.value);
      this.permDistrict.setValue(this.presDistrict.value);
      this.permAState.setValue(this.presAState.value);
    }
    else
    {
      this.permAddress1.setValue('');
      this.permAddress2.setValue('');
      this.permCity.setValue('');
      this.permPIN.setValue('');
      this.permDistrict.setValue('');
      this.permAState.setValue('');
    }
    
  }


  async addCandidateInformation(candidatePersonalForm: FormGroup) {
    LoaderService.showLoader();

    if (candidatePersonalForm.valid) {
      let formData = new FormData();
      formData.append('CandidateName', this.candidatePersonalForm.get('name')?.value);
      formData.append('contactNumber', this.candidatePersonalForm.get('contactNo')?.value);
      formData.append('emailId', this.candidatePersonalForm.get('emailId')?.value);
      formData.append('currentLocation', this.candidatePersonalForm.get('currentLocation')?.value);
      formData.append('pG_CollegeName', this.candidatePersonalForm.get('collegeName')?.value);
      formData.append('pG_DegreeName', this.candidatePersonalForm.get('degree')?.value);
      formData.append('pG_Percantage', this.candidatePersonalForm.get('percentage')?.value);
      formData.append('pG_YearOfPassing', this.candidatePersonalForm.get('yearOfPassing')?.value);
      formData.append('gD_CollegeName', this.candidatePersonalForm.get('collegeNameGraduation')?.value);
      formData.append('gD_DegreeName', this.candidatePersonalForm.get('degreeGraduation')?.value);
      formData.append('gD_Percantage', this.candidatePersonalForm.get('percentageGraduation')?.value);
      formData.append('gD_YearOfPassing', this.candidatePersonalForm.get('yearOfPassingGraduation')?.value);
      formData.append('iD_Percantage', this.candidatePersonalForm.get('percentage12')?.value);
      formData.append('iD_YearOfPassing', this.candidatePersonalForm.get('yearOfPassing12')?.value);
      formData.append('ssC_Percantage', this.candidatePersonalForm.get('percentage10')?.value);
      formData.append('ssC_YearOfPassing', this.candidatePersonalForm.get('yearOfPassing10')?.value);
      formData.append('profileImage', this.candidatePersonalForm.get('profileImage')?.value);
      formData.append('resume', this.myfile);
      formData.append('PermanentAddress.Address1', this.candidatePersonalForm.get('permAddress1')?.value);
      formData.append('PermanentAddress.Address2', this.candidatePersonalForm.get('permAddress2')?.value);
      formData.append('PermanentAddress.City', this.candidatePersonalForm.get('permCity')?.value);
      formData.append('PermanentAddress.PIN', this.candidatePersonalForm.get('permPIN')?.value);
      formData.append('PermanentAddress.District', this.candidatePersonalForm.get('permDistrict')?.value);
      formData.append('PermanentAddress.State', this.candidatePersonalForm.get('permAState')?.value);

      formData.append('PresentAddress.Address1', this.candidatePersonalForm.get('presAddress1')?.value);
      formData.append('PresentAddress.Address2', this.candidatePersonalForm.get('presAddress2')?.value);
      formData.append('PresentAddress.City', this.candidatePersonalForm.get('presCity')?.value);
      formData.append('PresentAddress.PIN', this.candidatePersonalForm.get('presPIN')?.value);
      formData.append('PresentAddress.District', this.candidatePersonalForm.get('presDistrict')?.value);
      formData.append('PresentAddress.State', this.candidatePersonalForm.get('presAState')?.value);

      this.jobtypeservice.addNewCandidate(formData).subscribe(
        (data: any) => {
          if (data.body != null && data.body.returnCode == 200) {
            this.toastr.success('Information has been successfully submitted!');
            LoaderService.hideLoader();
            this.candidatePersonalForm.reset();
            this.dragAreaClass = "";
            this.isalreadyregistered = true;
            //this.route.navigate(['/errorpage']);
          }
        },
        (err) => {
          this.toastr.error('Failed to submit due to some technical error, Please try again after sometime!');
          LoaderService.hideLoader();
          this.candidatePersonalForm.reset();
          this.dragAreaClass = "";
        });
    }
  }

}
