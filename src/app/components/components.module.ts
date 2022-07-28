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
import { CookieService } from 'ngx-cookie-service';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './header/header.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent,
    TextInputComponent
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
    TextInputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CookieService]
})
export class ComponentsModule {
}
