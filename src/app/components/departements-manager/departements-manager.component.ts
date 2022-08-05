/*
 * Copyright (c) 05/08/2022 06:55
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Departement } from '../../services/departements.service';

@Component({
  selector: 'app-departements-manager',
  templateUrl: './departements-manager.component.html',
  styles: []
})
export class DepartementsManagerComponent implements OnInit {
  currentDepartement: Departement | null = null;
  newDepartement: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
