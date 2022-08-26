/*
 * Copyright (c) 23/08/2022 07:46
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
  selector: 'app-export-all-content',
  templateUrl: './export-all-content.component.html',
  styles: []
})
export class ExportAllContentComponent implements OnInit {

  content: Candidate[] = [];
  candidates: any;
  filieres: any[];
  regions: any[];
  diplomes: any[];
  level: number;
  cursus: string;
  group_by: string;
  groupByContent: { label: string, value: string }[] = [
    { label: 'Grouper par régions', value: 'regions' },
    { label: 'Grouper par filières', value: 'filieres' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private constantsService: ConstantsService) {
    this.group_by = 'regions';
    this.filieres = data.filieres;
    this.regions = data.regions || [];
    this.diplomes = data.diplomes || [];
    this.level = parseInt(data.level);
    this.cursus = data.cursus;
    this.content = _.sortBy(data.candidates, (n1) => -n1.average);
    this.candidates = this.getGroups(this.content, this.group_by);
  }

  ngOnInit(): void {
  }

  getGroups(candidates: Candidate[], group_by: string) {
    return _.groupBy(candidates, group_by === 'filieres' ? 'filiere_choisie' : 'region_origine');
  }

  sort(data: any[]) {
    return _.sortBy(data, (n1) => -n1.average);
  }

  getKeys(object: any) {
    return Object.keys(object);
  }

  getExporterContent() {
    const result: any[] = [];
    this.getKeys(this.candidates).forEach(key => {
      result.push({
        level: this.level,
        filiere: this.getFiliere(key),
        region: this.getRegion(key),
        cursus: this.cursus,
        group_filiere: this.group_by === 'filieres',
        list: _.sortBy(this.candidates[key].map((item: any, index: number) => ({
          id: `${index + 1}`,
          nom: (item.nom || '') + ' ' + (item.prenom || ''),
          date_nais: moment(item.date_nais).format('DD/MM/YYYY'),
          lieu_nais: item.lieu_nais || '---',
          sexe: item.sexe || '',
          anonymous_num: this.getNumberValue(item.anonymous_num),
          anonymous_num2: this.getNumberValue(item.anonymous_num2),
          note1: this.getNumberValue(item.note1),
          note2: this.getNumberValue(item.note2),
          note3: this.getNumberValue(item.note3),
          average: this.getNumberValue(item.average),
          cursus: item.cursus,
          region_origine: this.getRegion(item.region_origine),
          statut_mat: item.statut_mat || '---',
          nationalite: item.nationalite || '',
          niveau: item.niveau + '',
          filiere_choisie: this.getFiliere(item.filiere_choisie),
          diplome_entree: this.getDiplome(item.diplome_entree)
        })), (n1) => -n1.average)
      });
    });
    return result;
  }

  getNumberValue(value: any) {
    if (value)
      return value < 0 ? 'Abs' : value + '';
    return '';
  }

  exportPDF() {
    this.constantsService.saveAllPDF(this.getExporterContent(),
      `${this.cursus}_niveau_${this.level}.pdf`);
  }

  getFiliere(key: string) {
    try {
      return this.filieres.find(item => item.value == key)?.label || 'Tronc commun';
    } catch (e) {
      return 'Tronc commun';
    }
  }

  exportCSV() {
    this.constantsService.saveAllCSV(this.getExporterContent(),
      `${this.cursus}_niveau_${this.level}.csv`);
  }

  onGroupByChange(value: string) {
    this.candidates = this.getGroups(this.content, value);
  }

  getRegion(key: string) {
    try {
      return this.regions.find(item => item.value == key)?.label || 'Abs';
    } catch (e) {
      return 'Abs';
    }
  }

  private getDiplome(key: number) {
    try {
      return this.diplomes.find(item => item.value == key)?.label || '---';
    } catch (e) {
      return '---';
    }
  }
}
