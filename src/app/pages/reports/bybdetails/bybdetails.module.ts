import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BYBdetailsRoutingModule } from './bybdetails-routing.module';
import { BYBdetailsComponent } from './bybdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from 'src/app/pipes/search-filter.pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    BYBdetailsComponent
  ],
  imports: [
    CommonModule,
    BYBdetailsRoutingModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    FormsModule
  ]
})
export class BYBdetailsModule { }
