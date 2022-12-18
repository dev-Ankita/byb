import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children:
    [
      { path: '', redirectTo: 'reports', pathMatch: 'full'},
      { path: 'reports', loadChildren: ()=> import('../reports/reports.module').then((m)=> m.ReportsModule)},
      { path: 'configuration', loadChildren: () => import('../configurations/configurations.module').then(m => m.ConfigurationsModule) },
      { path: 'logs', loadChildren: () => import('../logs/logs.module').then(m => m.LogsModule) },
      { path: 'link', loadChildren: () => import('../link/link.module').then(m => m.LinkModule) },


    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
