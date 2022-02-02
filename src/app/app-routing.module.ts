import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PageNotFoundComponent } from "./core/page-not-found.component";
import { ForbiddenAccessComponent } from "./core/forbidden-access.component";

const routes: Routes = [

  { path: 'dashboard', loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'entries', loadChildren: () => import('../app/entry/entry.module').then(m => m.EntryModule) },
  { path: 'persons', loadChildren: () => import('../app/person/person.module').then(m => m.PersonModule) },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'forbiddden-access', component: ForbiddenAccessComponent },
  { path: '**', redirectTo: 'page-not-found' }
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
