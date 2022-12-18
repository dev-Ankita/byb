import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferCandidateComponent } from './refer-candidate.component';

const routes: Routes = [{ path: '', component: ReferCandidateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferCandidateRoutingModule { }
