import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidatsListComponent} from "./screens/dashboard/candidats-list/candidats-list.component";
import {DashboardComponent} from "./screens/dashboard/dashboard.component";
import {HomeComponent} from "./screens/dashboard/home/home.component";
import {SettingsComponent} from "./screens/dashboard/settings/settings.component";
import {SignInComponent} from "./screens/sign-in/sign-in.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'candidats-list', component: CandidatsListComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
