/*
 * Copyright (c) 05/08/2022 06:33
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Option } from '../../services/options.service';

@Component({
  selector: 'app-options-manager',
  templateUrl: './options-manager.component.html',
  styles: []
})
export class OptionsManagerComponent implements OnInit {
  currentOption: Option | null = null;
  newOption: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
