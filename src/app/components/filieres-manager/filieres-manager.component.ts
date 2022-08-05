/*
 * Copyright (c) 05/08/2022 06:10
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Filiere } from '../../services/filieres.service';

@Component({
  selector: 'app-filieres-manager',
  templateUrl: './filieres-manager.component.html',
  styles: []
})
export class FilieresManagerComponent implements OnInit {
  currentFiliere: Filiere | null = null;
  newFiliere: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
