/*
 * Copyright (c) 28/07/2022 00:52
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styles: []
})
export class TextInputComponent implements OnInit {
  @Input() type: string = 'text';
  show: boolean = false;
  focus: boolean = false;
  @Input() icon: string | undefined;
  @Input() label: string | undefined;
  @Input() placeholder: string = '';
  @Input() secure: boolean = false;
  @Input() value: any;
  @Output() valueChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  focusin() {
    this.focus = true;
  }

  focusout() {
    this.focus = false;
  }

  toggleType() {
    this.show = !this.show;
    this.type = this.show ? 'text' : 'password';
  }
}
