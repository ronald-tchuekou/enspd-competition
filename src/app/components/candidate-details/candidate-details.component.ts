/*
 * Copyright (c) 30/07/2022 06:28
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';
import { Cursus, Sexe } from '../../services/candidates.service';

moment.locale('fr');

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styles: []
})
export class CandidateDetailsComponent implements OnInit, OnChanges {
  @Input() currentCandidate: any = null;
  @Input() candidate: any = null;
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();
  labels: any = {
    anonymous_num: 'Numéro anonyme',
    note1: 'Note 1',
    note2: 'Note 2',
    note3: 'Note 3',
    average: 'Moyenne',
    range: 'Rang',
    cursus: 'Cursus',
    niveau: 'Niveau',
    filiere_choisie: 'Filière choisie',
    option_choisie: 'Option choisie',
    diplome_entree: 'Diplôme d\'entrée',
    region_origine: 'Région d\'origine',
    depart_origine: 'Département d\'origine',
    statut_mat: 'Statut matrimonial',
    sexe: 'Sexe',
    nationalite: 'Nationalité'
  };
  keys: string[] = Object.keys(this.labels);
  @Input() filieres: any[] = [];
  @Input() options: any[] = [];
  @Input() departments: any[] = [];
  @Input() regions: any[] = [];
  @Input() diplomes: any[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCandidate']) {
      const c = changes['currentCandidate'].currentValue;
      if (c)
        this.candidate = {
          ...c,
          region_origine: this.getRegion(c?.region_origine),
          depart_origine: this.getDepartement(c?.depart_origine),
          filiere_choisie: this.getFiliere(c?.filiere_choisie),
          option_choisie: this.getOption(c?.option_choisie),
          diplome_entree: this.getDiplome(c?.diplome_entree)
        };
    }
  }

  ngOnInit(): void {
  }

  getBirthday(birthday: any) {
    return moment(birthday).format('DD MMMM YYYY');
  }

  getOption(query: number) {
    return this.options.find(item => item.value === query)?.label || '';
  }

  getFiliere(query: number) {
    return this.filieres.find(item => item.value === query)?.label || '';
  }

  getRegion(query: number) {
    return this.regions.find(item => item.value === query)?.label || '';
  }

  getDepartement(query: number) {
    return this.departments.find(item => item.value === query)?.label || '';
  }

  getDiplome(query: number) {
    return this.diplomes.find(item => item.value === query)?.label || '';
  }
}
