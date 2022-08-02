/*
 * Copyright (c) 30/07/2022 15:42
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styles: []
})
export class EmptyStateComponent implements OnInit {
  @Input() text: string = 'Pas d\'information à afficher !';

  constructor() {
  }

  ngOnInit(): void {
  }

}
