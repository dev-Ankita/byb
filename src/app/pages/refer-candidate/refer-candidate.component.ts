import { Component, OnInit } from '@angular/core';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-refer-candidate',
  templateUrl: './refer-candidate.component.html',
  styleUrls: ['./refer-candidate.component.scss']
})
export class ReferCandidateComponent implements OnInit {
  jobtypedata: any;
  jobTypes: any;
  referredEmployee: any;

  skillset: any;
  candidateForm!: FormGroup;
  candidateName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
  appliedFor = new FormControl('', Validators.required);
  skills = new FormControl([], Validators.required);
  yearsofEmployment = new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]);
  preferredWorkType = new FormControl('', Validators.required);
  preferredWorkLocation = new FormControl('', Validators.required);
  referredBy = new FormControl('', Validators.required);
  myfile: any = null;
  formFile = new FormControl(this.myfile, [Validators.required, this.validFile.bind(this)])
  preferredWorklocation: any[] = []


  formdata = new FormData;

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
  fileName: any;



  constructor(private jobtypeservice: JobtypesService, private fb: FormBuilder,private toastr:ToastrService) {
    this.candidateForm = this.fb.group({
      candidateName: this.candidateName,
      appliedFor: this.appliedFor,
      skills: this.skills,
      yearsofEmployment: this.yearsofEmployment,
      preferredWorkType: this.preferredWorkType,
      preferredWorkLocation: this.preferredWorkLocation,
      referredBy: this.referredBy,
      formFile: this.formFile
    });
  }




  async ngOnInit() {
    LoaderService.showLoader();

    await this.populateData();

    LoaderService.hideLoader();
  }

  async getJobType() {
    await lastValueFrom(this.jobtypeservice.getJobType()).then((res)=>{
      this.jobTypes = res.result;
    })
    .catch((err)=>{

    });
  }
  async getSkills() {
    this.dropdownList = ((await lastValueFrom(this.jobtypeservice.getSkill()))?.result as Array<any>)
      .map((s: any) => ({ item_id: s.skillId, item_text: s.skillName }));
    LoaderService.hideLoader();
  }

  FileUpload(event: any) {
    this.myfile = <File>event.target.files[0];
    if (this.myfile != null) {
      this.fileName = event.target.files[0].name;

      this.validFileSize(this.myfile);
    }
  }
  validFileSize(event: any): any {
    if (event.size > 5 * 1024 * 1024) {
      this.formFile.setValue(null);
      this.candidateForm.controls['formFile'].setErrors({ 'fileSizeInvalid': true })
      this.myfile = null;
    }
  }
  validFile(control: AbstractControl): any {
    var extensions = ['pdf', 'docx', 'txt', 'doc']
    if (control.value != null && control.value != '') {
      var ext = control.value.substring(control.value.lastIndexOf('.') + 1)
      if (extensions.includes(ext)) {
        return null;
      }
      control.setValue(null);
      return { 'InvalidExtension': true };
    }
  }

  async populateData() {
    await this.getJobType();
    await this.getSkills();
  }

  addCandidateInformation(candidateForm: FormGroup) {
    LoaderService.showLoader();

    if (candidateForm.valid) {
      let formData = new FormData();
      formData.append('CandidateName', this.candidateForm.get('candidateName')?.value);
      formData.append('PreferredWorkType', this.candidateForm.get('preferredWorkType')?.value);
      formData.append('PreferredWorkLocations', this.candidateForm.get('preferredWorkLocation')?.value);
      formData.append('ExperienceYears', this.candidateForm.get('yearsofEmployment')?.value);
      formData.append('ReferredBy', this.candidateForm.get('referredBy')?.value);
      formData.append('AppliedFor', this.candidateForm.get('appliedFor')?.value);
      
      if (this.candidateForm.value.skills.length > 0) {
        formData.append('Skills', ((this.candidateForm.value.skills as Array<any>).map(x => x.item_id).slice(0).join(',')));
      }
      formData.append('formFile', this.myfile);

      this.jobtypeservice.addCandidate(formData).subscribe(
        (data: any) => {
          if (data.body != null && data.body.returnCode == 200) {
            this.toastr.success('Candidate profile has been successfully submitted!');
            this.resetForm();
            LoaderService.hideLoader();
          }
        },
        (err) => {
          this.toastr.error('Failed to submit due to technical error, Please Try again after sometime');
          LoaderService.hideLoader();
        });
    }
  }

  resetForm() {
    this.candidateForm.reset();
  }

}
