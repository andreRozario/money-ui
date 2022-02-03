import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryByPersonComponent } from './entry-by-person/entry-by-person.component';

import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  { path: 'entries-by-person', component: EntryByPersonComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SHOW_ENTRY' ] } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ReportRoutingModule { }
