/*
 * Copyright (c) 29/07/2022 02:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styles: []
})
export class CircularProgressComponent implements OnInit, OnChanges {
  @Input() value: number = 40;
  @Input() color: string = '#2F80ED';
  dashoffset: number = 285 - (285 * this.value) / 100;
  colors: any = {};

  constructor() {
    this.colors = {
      c1: `${this.color}33`,
      c2: this.color,
      text: this.color
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['value'];
    const color = changes['color'];
    if (value) {
      this.dashoffset = 285 - (285 * value.currentValue) / 100;
    }
    if (color) {
      this.colors = {
        c1: `${this.color}33`,
        c2: this.color,
        text: this.color
      };
    }
  }

}
