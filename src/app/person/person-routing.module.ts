import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonFilterComponent } from './person-filter/person-filter.component';

import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  { path: '', component: PersonFilterComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SHOW_PERSON' ] } },
  { path: 'create', component: PersonCreateComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SAVE_PERSON' ] } },
  { path: 'edit/:id', component: PersonCreateComponent, canActivate: [ AuthGuard ], data: { permissions: [ 'SAVE_PERSON' ] } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PersonRoutingModule { }
