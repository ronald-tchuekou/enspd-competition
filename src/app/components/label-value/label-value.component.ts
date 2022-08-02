/*
 * Copyright (c) 30/07/2022 07:46
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styles: []
})
export class LabelValueComponent implements OnInit {
  @Input() label: string = '';
  @Input() value: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
