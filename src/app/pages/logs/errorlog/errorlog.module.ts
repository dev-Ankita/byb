import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorlogRoutingModule } from './errorlog-routing.module';
import { ErrorlogComponent } from './errorlog.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ErrorlogComponent
  ],
  imports: [
    CommonModule,
    ErrorlogRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class ErrorlogModule { }
