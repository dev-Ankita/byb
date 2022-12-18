import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
{ path: '', component: ReportsComponent, children:
[
  { path: '', redirectTo: 'bybdetails', pathMatch: 'full'},
  { path: 'bybdetails', loadChildren: ()=> import('./bybdetails/bybdetails.module').then((m)=> m.BYBdetailsModule)},
  // { path: 'candidatedetails', loadChildren: ()=> import('./candidatedetails/candidatedetails-routing.module').then((m)=> m.CandidatedetailsRoutingModule)},
  { path: 'candidatedetails', loadChildren: () => import('./candidateinformations/candidateinformations.module').then(m => m.CandidateinformationsModule) },
 

]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
