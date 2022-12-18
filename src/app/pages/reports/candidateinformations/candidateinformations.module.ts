import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateinformationsRoutingModule } from './candidateinformations-routing.module';
import { CandidateinformationsComponent } from './candidateinformations.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidateinformationsComponent
  ],
  imports: [
    CommonModule,
    CandidateinformationsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CandidateinformationsModule { }
