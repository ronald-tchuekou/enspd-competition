/*
 * Copyright (c) 05/08/2022 05:47
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Diplome } from '../../services/diplome.service';

@Component({
  selector: 'app-diplomes-manager',
  templateUrl: './diplomes-manager.component.html',
  styles: []
})
export class DiplomesManagerComponent implements OnInit {
  currentDiplome: Diplome | null = null;
  newDiplome: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
