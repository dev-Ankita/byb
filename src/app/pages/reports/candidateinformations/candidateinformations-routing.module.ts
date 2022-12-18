import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateinformationsComponent } from './candidateinformations.component';

const routes: Routes = [{ path: '', component: CandidateinformationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateinformationsRoutingModule { }
