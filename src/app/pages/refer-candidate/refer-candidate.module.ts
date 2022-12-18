import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferCandidateRoutingModule } from './refer-candidate-routing.module';
import { ReferCandidateComponent } from './refer-candidate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    ReferCandidateComponent
  ],
  imports: [
    CommonModule,
    ReferCandidateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ReferCandidateModule { }
