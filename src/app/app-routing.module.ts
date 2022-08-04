/*
 * Copyright (c) 28/07/2022 08:21
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CandidatsListComponent } from './screens/dashboard/candidats-list/candidats-list.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { HomeComponent } from './screens/dashboard/home/home.component';
import { SettingsComponent } from './screens/dashboard/settings/settings.component';
import { PassForgetComponent } from './screens/pass-forget/pass-forget.component';
import { ResetPassComponent } from './screens/reset-pass/reset-pass.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'candidats-list', component: CandidatsListComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'pass-forget', component: PassForgetComponent },
  { path: 'reset-pass', component: ResetPassComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
