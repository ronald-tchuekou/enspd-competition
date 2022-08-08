/*
 * Copyright (c) 08/08/2022 08:31
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Cursus } from '../../../services/candidates.service';

@Component({
  selector: 'app-export-level-cursus',
  templateUrl: './export-level-cursus.component.html',
  styles: []
})
export class ExportLevelCursusComponent implements OnInit {
  level: string = '';
  cursus: string = '';
  levels: any[] = [
    { label: '...', value: '' },
    { label: 'Niveau 1', value: 1 },
    { label: 'Niveau 2', value: 2 }
  ];
  cursus_list: any[] = [
    { label: '...', value: '' },
    { label: Cursus.SI, value: Cursus.SI },
    { label: Cursus.IN, value: Cursus.IN }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
