import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
// import { FormdetailsComponent } from '../formdetails/formdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  declarations: [
    DashboardComponent,
    // FormdetailsComponent,
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,   
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule
  ],
 
})
export class DashboardModule { }
