import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewdashboardComponent } from './newdashboard.component';

const routes: Routes = [{ path: '', component: NewdashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewdashboardRoutingModule { }
