/*
 * Copyright (c) 28/07/2022 07:52
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TextInputComponent } from './text-input/text-input.component';
import { LoaderContentComponent } from './loader-content/loader-content.component';
import { LoaderContextComponent } from './loader-context/loader-context.component';
import { HomeBilanComponent } from './home-bilan/home-bilan.component';
import { HomeAccountsListComponent } from './home-accounts-list/home-accounts-list.component';
import { HomeLastCandidatsListComponent } from './home-last-candidats-list/home-last-candidats-list.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { CircularProgressComponent } from './circular-progress/circular-progress.component';
import { ListCandidatsComponent } from './list-candidats/list-candidats.component';
import { ListCandidatsContentComponent } from './list-candidats-content/list-candidats-content.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent,
    TextInputComponent,
    LoaderContentComponent,
    LoaderContextComponent,
    HomeBilanComponent,
    HomeAccountsListComponent,
    HomeLastCandidatsListComponent,
    InputSelectComponent,
    CircularProgressComponent,
    ListCandidatsComponent,
    ListCandidatsContentComponent,
    CandidateDetailsComponent,
    CandidateFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent,
    TextInputComponent,
    LoaderContentComponent,
    LoaderContextComponent,
    HomeBilanComponent,
    HomeAccountsListComponent,
    HomeLastCandidatsListComponent,
    InputSelectComponent,
    CircularProgressComponent,
    ListCandidatsComponent,
    ListCandidatsContentComponent,
    CandidateDetailsComponent,
    CandidateFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class ComponentsModule {
}
