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
import { LabelValueComponent } from './label-value/label-value.component';
import { SimpleInputComponent } from './simple-input/simple-input.component';
import { SimpleSelectComponent } from './simple-select/simple-select.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { AccountListComponent } from './home-accounts-list/account-list/account-list.component';
import { AccountFormComponent } from './home-accounts-list/account-form/account-form.component';
import { RegionsManagerComponent } from './regions-manager/regions-manager.component';
import { RegionListComponent } from './regions-manager/region-list/region-list.component';
import { RegionFormComponent } from './regions-manager/region-form/region-form.component';
import { OptionsManagerComponent } from './options-manager/options-manager.component';
import { OptionListComponent } from './options-manager/option-list/option-list.component';
import { OptionFormComponent } from './options-manager/option-form/option-form.component';
import { FilieresManagerComponent } from './filieres-manager/filieres-manager.component';
import { FiliereListComponent } from './filieres-manager/filiere-list/filiere-list.component';
import { FiliereFormComponent } from './filieres-manager/filiere-form/filiere-form.component';
import { DiplomesManagerComponent } from './diplomes-manager/diplomes-manager.component';
import { DiplomeListComponent } from './diplomes-manager/diplome-list/diplome-list.component';
import { DiplomeFormComponent } from './diplomes-manager/diplome-form/diplome-form.component';
import { DepartementsManagerComponent } from './departements-manager/departements-manager.component';
import { DepartementListComponent } from './departements-manager/departement-list/departement-list.component';
import { DepartementFormComponent } from './departements-manager/departement-form/departement-form.component';
import { ExportLevelCursusComponent } from './modals/export-level-cursus/export-level-cursus.component';
import { ExportContentComponent } from './modals/export-content/export-content.component';

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
    CandidateFormComponent,
    LabelValueComponent,
    SimpleInputComponent,
    SimpleSelectComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    EmptyStateComponent,
    AccountListComponent,
    AccountFormComponent,
    RegionsManagerComponent,
    RegionListComponent,
    RegionFormComponent,
    OptionsManagerComponent,
    OptionListComponent,
    OptionFormComponent,
    FilieresManagerComponent,
    FiliereListComponent,
    FiliereFormComponent,
    DiplomesManagerComponent,
    DiplomeListComponent,
    DiplomeFormComponent,
    DepartementsManagerComponent,
    DepartementListComponent,
    DepartementFormComponent,
    ExportLevelCursusComponent,
    ExportContentComponent
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
    CandidateFormComponent,
    LabelValueComponent,
    SimpleInputComponent,
    SimpleSelectComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    EmptyStateComponent,
    AccountListComponent,
    AccountFormComponent,
    RegionsManagerComponent,
    RegionListComponent,
    RegionFormComponent,
    OptionsManagerComponent,
    OptionListComponent,
    OptionFormComponent,
    FilieresManagerComponent,
    FiliereListComponent,
    FiliereFormComponent,
    DiplomesManagerComponent,
    DiplomeListComponent,
    DiplomeFormComponent,
    DepartementsManagerComponent,
    DepartementListComponent,
    DepartementFormComponent,
    ExportLevelCursusComponent,
    ExportContentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
export class ComponentsModule {
}
