import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorlogComponent } from './errorlog.component';

const routes: Routes = [{ path: '', component: ErrorlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorlogRoutingModule { }
