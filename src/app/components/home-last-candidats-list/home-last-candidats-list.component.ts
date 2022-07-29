/*
 * Copyright (c) 29/07/2022 04:09
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-last-candidats-list',
  templateUrl: './home-last-candidats-list.component.html',
  styles: []
})
export class HomeLastCandidatsListComponent implements OnInit {
  content: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  constructor() {
  }

  ngOnInit(): void {
  }

}
