/*
 * Copyright (c) 29/07/2022 08:27
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-candidats-content',
  templateUrl: './list-candidats-content.component.html',
  styles: []
})
export class ListCandidatsContentComponent implements OnInit {
  content: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  filieres: any[] = [
    { value: 'value1', label: 'Filière 1' },
    { value: 'value2', label: 'Filière 2' },
    { value: 'value3', label: 'Filière 3' }
  ];
  options: any[] = [
    { value: 'value1', label: 'Options 1' },
    { value: 'value2', label: 'Options 2' },
    { value: 'value3', label: 'Options 3' }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
