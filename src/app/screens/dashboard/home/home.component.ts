/*
 * Copyright (c) 15/08/2022 19:50
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Collection, DEFAULT_COLLECTION } from '../../../services/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  currentCollection: Collection = DEFAULT_COLLECTION;

  constructor() {
  }

  ngOnInit(): void {
  }

}
