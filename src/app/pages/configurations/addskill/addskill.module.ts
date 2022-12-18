import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddskillRoutingModule } from './addskill-routing.module';
import { AddskillComponent } from './addskill.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddskillComponent
  ],
  imports: [
    CommonModule,
    AddskillRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddskillModule { }
