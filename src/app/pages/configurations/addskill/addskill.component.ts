import { createMayBeForwardRefExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { JobtypesService } from 'src/app/service/jobtype.service';
import { LoaderService } from 'src/app/service/loader.service';
import { Settings } from 'src/app/utility/settings';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.scss']
})
export class AddskillComponent implements OnInit {
  SkillForm: FormGroup;
  skills: any;

  skillsList: any;
  newskillsList: any;
  newSkillsList: any;
  skillName: any;
  newskillList: any;

  constructor(private jobTypeService: JobtypesService, private router: Router) {
    Settings.CurrentUrl.next(this.router.url);
    this.SkillForm = new FormGroup({
      skillName: new FormControl(''),
    });    
  }

  async ngOnInit() {
    LoaderService.showLoader();
    await this.getSkills();    
    LoaderService.hideLoader();
  }

  async getSkills() {
    this.skills = ((await lastValueFrom(this.jobTypeService.getSkill()))?.result as Array<any>);
    this.newSkillsList=this.skills
    LoaderService.hideLoader();
  
  }
  addNewSkills() {
    LoaderService.showLoader();
    var skillData = {
      skillId: 0,
      skillName: this.SkillForm.get('skillName')?.value
    }
    var res=this.jobTypeService.addSkill(skillData).subscribe((res: any) => {
      
      if (res != null && res.returnCode == 200) {
        this.getSkills()
        LoaderService.hideLoader();
      }
    })
  }
  searchSkillData(event: any) {
    this.skills=this.newSkillsList;
    if (event.target.value != '' && event.target.value != undefined) {
      var newSkill: any = []
      let searchKeyword = event.target.value;
      searchKeyword = searchKeyword.toLowerCase();
      this.skills.forEach((item: any) => {
        if (item.skillName.toString().toLowerCase().indexOf(searchKeyword) > -1)
        {
          newSkill.push(item)
        }
      });
    
      this.skills = newSkill;

    }
  }
}
