import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LinkComponent } from './link.component';

const routes: Routes = [{ path: '', component: LinkComponent, children:
[
  { path: '', redirectTo: 'referrallink', pathMatch: 'full'},
  { path: 'referrallink', loadChildren: () => import('../link/referrallink/referrallink.module').then(m => m.ReferrallinkModule) },

] }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinkRoutingModule { }
