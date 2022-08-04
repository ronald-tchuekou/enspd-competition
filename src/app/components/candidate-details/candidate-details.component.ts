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
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();
  labels: any = {
    nom: 'Nom',
    prenom: 'Prénom',
    date_nais: 'Date de naissance',
    lieu_nais: 'Lieu de naissance',
    region_origine: 'Région d\'origine',
    depart_origine: 'Département d\'origine',
    statut_mat: 'Statut matrimonial',
    sexe: 'Sexe',
    nationalite: 'Nationalité',
    nom_pere: 'Nom du père',
    prof_pere: 'Profession du père',
    nom_mere: 'Nom de la mère',
    prof_mere: 'Profession de la mère',
    cursus: 'Cursus',
    niveau: 'Niveau',
    filiere_choisie: 'Filière choisie',
    option_choisie: 'Option choisie',
    diplome_entree: 'Diplôme d\'entrée'
  };
  keys: string[] = Object.keys(this.labels);

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCandidate']) {
      console.log(this.currentCandidate);
    }
  }

  ngOnInit(): void {
  }

  getBirthday(birthday: string) {
    return moment(birthday).format('DD MMMM YYYY');
  }
}
