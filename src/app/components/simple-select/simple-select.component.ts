/*
 * Copyright (c) 30/07/2022 08:59
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styles: []
})
export class SimpleSelectComponent implements OnInit {
  @Input() value: any = '';
  @Input() label: any = '';
  @Input() content: any[] = [];
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
