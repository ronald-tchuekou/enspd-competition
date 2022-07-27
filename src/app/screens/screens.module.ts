import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import {MaterialModule} from "../material/material.module";
import { SignInComponent } from './sign-in/sign-in.component';
import { PassForgetComponent } from './pass-forget/pass-forget.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { CandidatsListComponent } from './dashboard/candidats-list/candidats-list.component';
import { SettingsComponent } from './dashboard/settings/settings.component';

@NgModule({
  declarations: [
    SignInComponent,
    PassForgetComponent,
    ResetPassComponent,
    DashboardComponent,
    HomeComponent,
    CandidatsListComponent,
    SettingsComponent
  ],
  imports: [CommonModule, MaterialModule, ComponentsModule, RouterModule],
  exports: [
    SignInComponent,
    PassForgetComponent,
    ResetPassComponent,
    DashboardComponent,
    HomeComponent,
    CandidatsListComponent,
    SettingsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScreensModule { }
