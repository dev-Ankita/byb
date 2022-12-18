import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatepersonalInfoComponent } from './candidatepersonal-info.component';

const routes: Routes = [{ path: '', component: CandidatepersonalInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatepersonalInfoRoutingModule { }
