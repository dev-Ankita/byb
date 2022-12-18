import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BYBdetailsComponent } from './bybdetails.component';

const routes: Routes = [{ path: '', component: BYBdetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BYBdetailsRoutingModule { }
