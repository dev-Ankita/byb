import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

const routes: Routes =[
  { path: '', component: ConfigurationsComponent, children:
    [
      { path: '', redirectTo: 'skills', pathMatch: 'full'},
      { path: 'skills', loadChildren: () => import('../configurations/addskill/addskill.module').then(m => m.AddskillModule) },
      { path: 'job-vacancy', loadChildren: () => import('../configurations/job-vacancy/job-vacancy.module').then(m => m.JobVacancyModule) },
      { path: 'addUserAccess', loadChildren: () => import('../configurations/add-user-access/add-user-access.module').then(m => m.AddUserAccessModule) }

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
