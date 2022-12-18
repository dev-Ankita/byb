import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferrallinkRoutingModule } from './referrallink-routing.module';
import { ReferrallinkComponent } from './referrallink.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReferrallinkComponent
  ],
  imports: [
    CommonModule,
    ReferrallinkRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class ReferrallinkModule { }
