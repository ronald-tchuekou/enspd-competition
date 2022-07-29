/*
 * Copyright (c) 28/07/2022 17:31
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-context',
  templateUrl: './loader-context.component.html',
  styles: []
})
export class LoaderContextComponent implements OnInit {

  @Input() loading: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

}
