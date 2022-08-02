/*
 * Copyright (c) 30/07/2022 08:35
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styles: []
})
export class SimpleInputComponent implements OnInit {
  @Input() value: any = '';
  @Input() label: any = '';
  @Input() type: any = 'text';
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
