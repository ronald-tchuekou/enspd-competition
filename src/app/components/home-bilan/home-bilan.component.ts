/*
 * Copyright (c) 28/07/2022 22:19
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-bilan',
  templateUrl: './home-bilan.component.html',
  styles: []
})
export class HomeBilanComponent implements OnInit {
  content: any[] = [
    { label: 'Label 1', value: 'Value 1' },
    { label: 'Label 2', value: 'Value 2' },
    { label: 'Label 3', value: 'Value 3' },
    { label: 'Label 4', value: 'Value 4' },
    { label: 'Label 5', value: 'Value 5' },
    { label: 'Label 6', value: 'Value 6' }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
