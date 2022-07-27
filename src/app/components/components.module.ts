import {HttpClientModule} from "@angular/common/http";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../material/material.module";
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MainContainerComponent } from './main-container/main-container.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    MainContainerComponent
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
    MainContainerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
