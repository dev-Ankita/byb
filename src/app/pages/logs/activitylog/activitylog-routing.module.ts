import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitylogComponent } from './activitylog.component';

const routes: Routes = [{ path: '', component: ActivitylogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitylogRoutingModule { }
