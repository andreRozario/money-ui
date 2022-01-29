import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonCreateComponent } from './person-create/person-create.component';
import { PersonFilterComponent } from './person-filter/person-filter.component';

const routes: Routes = [
  { path: 'persons', component: PersonFilterComponent },
  { path: 'persons/create', component: PersonCreateComponent },
  { path: 'persons/edit/:id', component: PersonCreateComponent },
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
