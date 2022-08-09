/*
 * Copyright (c) 08/08/2022 09:20
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Candidate } from '../../../services/candidates.service';
import { ConstantsService } from '../../../services/constants.service';

@Component({
  selector: 'app-export-content',
  templateUrl: './export-content.component.html',
  styles: []
})
export class ExportContentComponent implements OnInit {

  candidates: any;
  filieres: any[] = [];
  options: any[] = [];
  level: number = -1;
  cursus: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private constantsService: ConstantsService) {
    this.filieres = data.filieres;
    this.options = data.options;
    this.level = parseInt(data.level);
    this.cursus = data.cursus;
    console.log('Candidates : ', data);
    this.candidates = this.getGroups(data.candidates);
  }

  ngOnInit(): void {
  }

  getGroups(candidates: Candidate[]) {
    if (this.level === 1)
      return { '1': candidates };
    if (this.level === 3) {
      return _.groupBy(
        candidates.filter(item => item.cursus === this.cursus),
        'filiere_choisie'
      );
    }
    return {};
  }

  getKeys(object: any) {
    return Object.keys(object);
  }

  exportPDF() {
    const result: any[] = [];
    this.getKeys(this.candidates).forEach(key => {
      result.push({
        level: this.level,
        filiere: this.getFiliere(key),
        cursus: this.cursus,
        list: this.candidates[key].map((item: any, index: number) => ({
          id: `${index + 1}`,
          nom: item.nom || '',
          prenom: item.prenom || '',
          date_nais: moment(item.date_nais).format('DD/MM/YYYY'),
          lieu_nais: item.lieu_nais || '',
          sexe: item.sexe || '',
          cursus: item.cursus
        }))
      });
    });
    this.constantsService.savePDF(result, `${this.cursus}_niveau_${this.level}.pdf`);
  }

  getFiliere(list: string) {
    return this.filieres.find(item => item.value == list)?.label || '';
  }

  exportCSV() {
    // TODO
  }

  exportEXCEL() {
    // TODO
  }
}
