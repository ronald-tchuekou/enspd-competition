/*
 * Copyright (c) 30/07/2022 06:28
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';

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
    sexe: 'Sex :',
    nationalite: 'Nationalité :',
    telephone: 'Téléphone :',
    email: 'Adresse e-mail :',
    filiere: 'Filière :',
    opt_comp: 'Option choisi :',
    nom_pere: 'Nom du père :',
    prof_pere: 'Profession du père :',
    nom_mere: 'Nom de la mère :',
    prof_mere: 'Profession de la mère :',
    tel_tut: 'Numéro du tuteur :',
    centre_origine: 'Centre d\'origine :',
    statut_mat: 'Statut matrimonial :',
    langue: 'Langue :'
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
