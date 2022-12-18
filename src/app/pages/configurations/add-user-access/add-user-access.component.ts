import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-access',
  templateUrl: './add-user-access.component.html',
  styleUrls: ['./add-user-access.component.scss']
})
export class AddUserAccessComponent implements OnInit {
  addUserAccessForm!:FormGroup;
  firstName = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
  emailId = new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,100})+$/)]);
  designation = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);

  constructor( private fb:FormBuilder) {
    this.addUserAccessForm = this.fb.group({
      firstName:this.firstName,
      emailId:this.emailId,
      designation:this.designation,
      checkArray: this.fb.array([], [Validators.required]),
    })
   }

  ngOnInit(): void {
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.addUserAccessForm.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  resetForm(){
    this.addUserAccessForm.reset();
  }
  
  addCandidateAccess(addUserAccessForm:FormGroup){
console.log(this.addUserAccessForm.value);
  }

}
