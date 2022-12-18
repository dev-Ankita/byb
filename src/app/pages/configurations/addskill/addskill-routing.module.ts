import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddskillComponent } from './addskill.component';

const routes: Routes = [{ path: '', component: AddskillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddskillRoutingModule { }
