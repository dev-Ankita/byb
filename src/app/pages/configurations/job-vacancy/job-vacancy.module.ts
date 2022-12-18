import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobVacancyRoutingModule } from './job-vacancy-routing.module';
import { JobVacancyComponent } from './job-vacancy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    JobVacancyComponent
  ],
  imports: [
    CommonModule,
    JobVacancyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class JobVacancyModule { }
