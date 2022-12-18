import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserAccessComponent } from './add-user-access.component';

const routes: Routes = [{ path: '', component: AddUserAccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUserAccessRoutingModule { }
