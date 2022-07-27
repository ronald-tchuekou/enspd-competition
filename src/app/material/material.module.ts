/*
 * Copyright (c) 28/07/2022
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from "@angular/material/menu";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";

const MAT_MODULES: any[] = [
  MatMenuModule,
  MatRippleModule,
  MatTabsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatIconModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatButtonModule,
  MatNativeDateModule,
  MatTooltipModule
]

@NgModule({
  imports: [CommonModule, MAT_MODULES],
  exports: [MAT_MODULES],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}]
})
export class MaterialModule {
}
