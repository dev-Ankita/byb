import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitylogRoutingModule } from './activitylog-routing.module';
import { ActivitylogComponent } from './activitylog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActivitylogComponent
  ],
  imports: [
    CommonModule,
    ActivitylogRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class ActivitylogModule { }
