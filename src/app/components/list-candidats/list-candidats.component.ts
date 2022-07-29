/*
 * Copyright (c) 29/07/2022 04:24
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-candidats',
  templateUrl: './list-candidats.component.html',
  styles: []
})
export class ListCandidatsComponent implements OnInit {
  content: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
