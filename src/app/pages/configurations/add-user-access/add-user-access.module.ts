import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserAccessRoutingModule } from './add-user-access-routing.module';
import { AddUserAccessComponent } from './add-user-access.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddUserAccessComponent
  ],
  imports: [
    CommonModule,
    AddUserAccessRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class AddUserAccessModule { }
