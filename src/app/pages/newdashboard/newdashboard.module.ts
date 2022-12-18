import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewdashboardRoutingModule } from './newdashboard-routing.module';
import { NewdashboardComponent } from './newdashboard.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewdashboardComponent
  ],
  imports: [
    CommonModule,
    NewdashboardRoutingModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule
  ]
})
export class NewdashboardModule { }
