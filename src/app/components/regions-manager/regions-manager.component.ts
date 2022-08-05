/*
 * Copyright (c) 05/08/2022 06:20
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Region } from '../../services/regions.service';

@Component({
  selector: 'app-regions-manager',
  templateUrl: './regions-manager.component.html',
  styles: []
})
export class RegionsManagerComponent implements OnInit {
  currentRegion: Region | null = null;
  newRegion: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
