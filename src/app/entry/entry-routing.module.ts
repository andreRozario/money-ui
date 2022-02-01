import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryCreateComponent } from './entry-create/entry-create.component';
import { EntryFilterComponent } from './entry-filter/entry-filter.component';

import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  { path: '', component: EntryFilterComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SHOW_ENTRY' ] } },
  { path: 'create', component: EntryCreateComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SAVE_ENTRY' ] } },
  { path: 'edit/:id', component: EntryCreateComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SAVE_ENTRY' ] } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EntryRoutingModule { }
