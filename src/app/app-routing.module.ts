import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './auth/authguard.guard';
import { DisableRegistrationGuard } from './disable-registration.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard',pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),  canActivate: [AuthguardGuard] },
  { path: 'refercandidate', loadChildren: () => import('./pages/refer-candidate/refer-candidate.module').then(m => m.ReferCandidateModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [AuthguardGuard] },
  { path: 'newdashboard', loadChildren: () => import('./pages/newdashboard/newdashboard.module').then(m => m.NewdashboardModule) },
  { path: 'candidateregistration/:emailId', loadChildren: () => import('./pages/candidatepersonal-info/candidatepersonal-info.module').then(m => m.CandidatepersonalInfoModule), canActivate:[DisableRegistrationGuard]},
  { path: 'errorpage', loadChildren: () => import('./pages/errorpage/errorpage.module').then(m => m.ErrorpageModule) },
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
