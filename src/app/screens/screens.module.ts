/*
 * Copyright (c) 28/07/2022 07:53
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { CandidatsListComponent } from './dashboard/candidats-list/candidats-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PassForgetComponent } from './pass-forget/pass-forget.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CandidateListDetailsComponent } from './dashboard/candidate-list-details/candidate-list-details.component';
import { CandidateListCollectionComponent } from './dashboard/candidate-list-collection/candidate-list-collection.component';

@NgModule({
  declarations: [
    SignInComponent,
    PassForgetComponent,
    ResetPassComponent,
    DashboardComponent,
    HomeComponent,
    CandidatsListComponent,
    SettingsComponent,
    CandidateListDetailsComponent,
    CandidateListCollectionComponent
  ],
  imports: [CommonModule, MaterialModule, ComponentsModule, RouterModule],
  exports: [
    SignInComponent,
    PassForgetComponent,
    ResetPassComponent,
    DashboardComponent,
    HomeComponent,
    CandidatsListComponent,
    SettingsComponent,
    CandidateListDetailsComponent,
    CandidateListCollectionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class ScreensModule {
}
