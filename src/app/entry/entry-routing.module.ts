import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryCreateComponent } from './entry-create/entry-create.component';
import { EntryFilterComponent } from './entry-filter/entry-filter.component';

const routes: Routes = [
  { path: 'entries', component: EntryFilterComponent },
  { path: 'entries/create', component: EntryCreateComponent },
  { path: 'entries/edit/:id', component: EntryCreateComponent }
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
