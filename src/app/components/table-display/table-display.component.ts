/*
 * Copyright (c) 09/08/2022 03:36
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Candidate } from '../../services/candidates.service';

@Component({
  selector: 'app-table-display',
  templateUrl: './table-display.component.html',
  styles: []
})
export class TableDisplayComponent implements OnInit {
  @Input() candidates: Candidate[] = [];
  @Input() filieres: any[] = [];
  @Input() options: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  getOption(option_choisie: number) {
    return this.options.find(item => item.value == option_choisie)?.label || '';
  }

  getFiliere(filiere_choisie: number) {
    try {
      return this.filieres.find(item => item.value == filiere_choisie)?.label || 'Tronc commun';
    } catch (e) {
      return 'Tronc commun';
    }
  }

  formatDate(date_nais: Date) {
    return moment(date_nais).format('DD/MM/YYYY');
  }
}
