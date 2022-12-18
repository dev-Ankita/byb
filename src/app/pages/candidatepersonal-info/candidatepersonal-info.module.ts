import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatepersonalInfoRoutingModule } from './candidatepersonal-info-routing.module';
import { CandidatepersonalInfoComponent } from './candidatepersonal-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidatepersonalInfoComponent
  ],
  imports: [
    CommonModule,
    CandidatepersonalInfoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CandidatepersonalInfoModule { }
