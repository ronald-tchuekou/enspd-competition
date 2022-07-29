/*
 * Copyright (c) 28/07/2022 22:09
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styles: []
})
export class InputSelectComponent implements OnInit {
  @Input() icon: string | undefined;
  @Input() label: string | undefined;
  @Input() content: any = [];
  @Input() value: any = '';
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
