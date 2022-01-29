import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/page-not-found.component";
import { EntryCreateComponent } from "./entry/entry-create/entry-create.component";
import { EntryFilterComponent } from "./entry/entry-filter/entry-filter.component";
import { PersonCreateComponent } from "./person/person-create/person-create.component";
import { PersonFilterComponent } from "./person/person-filter/person-filter.component";

const routes: Routes = [
  { path: '', redirectTo: 'entries', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
