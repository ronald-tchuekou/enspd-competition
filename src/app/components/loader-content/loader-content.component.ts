/*
 * Copyright (c) 28/07/2022 17:31
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-content',
  templateUrl: './loader-content.component.html',
  styles: []
})
export class LoaderContentComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() size: number = 30;

  constructor() {
  }

  ngOnInit(): void {
  }

}
