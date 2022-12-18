import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs.component';

const routes: Routes = [
  { path: '', component: LogsComponent, children:
    [
      { path: '', redirectTo: 'activitylog', pathMatch: 'full'},
      { path: 'errorlog', loadChildren: () => import('../logs/errorlog/errorlog.module').then(m => m.ErrorlogModule) },
      { path: 'activitylog', loadChildren: () => import('../logs/activitylog/activitylog.module').then(m => m.ActivitylogModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
