/*
 * Copyright (c) 30/07/2022 06:44
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styles: []
})
export class CandidateFormComponent implements OnInit, OnChanges {
  @Input() currentCandidate: any = null;
  @Output() onBackClick = new EventEmitter();
  title: string = '';
  lastname: string = '';
  firstname: string = '';
  birthday: string = '';
  birthday_place: string = '';
  sex: string = '';
  nationality: string = '';
  phone: string = '';
  email: string = '';
  filiere: string = '';
  option: string = '';
  father_name: string = '';
  father_prof: string = '';
  mother_name: string = '';
  mother_prof: string = '';
  tuteur_name: string = '';
  region: string = '';
  sex_content: any[] = [
    { label: 'Masculin', value: 'M' },
    { label: 'Féminin', value: 'F' }
  ];
  filieres: any[] = [];
  options: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.title = this.currentCandidate ?
      'Modification des informations du candidat' :
      'Ajout d\'un nouveau candidat dans la liste';
    this.initData(this.currentCandidate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['currentCandidate'];
    if (change) {
      this.title = change.currentValue ?
        'Modification des informations du candidat' :
        'Ajout d\'un nouveau candidat dans la liste';
      this.initData(change.currentValue);
    }
  }

  initData(current: any) {
    this.lastname = current ? current.lastname : '';
    this.firstname = current ? current.firstname : '';
    this.birthday = current ? current.birthday : '';
    this.birthday_place = current ? current.birthday_place : '';
    this.sex = current ? current.sex : '';
    this.nationality = current ? current.nationality : '';
    this.phone = current ? current.phone : '';
    this.email = current ? current.email : '';
    this.filiere = current ? current.filiere : '';
    this.option = current ? current.option : '';
    this.father_name = current ? current.father_name : '';
    this.father_prof = current ? current.father_prof : '';
    this.mother_name = current ? current.mother_name : '';
    this.mother_prof = current ? current.mother_prof : '';
    this.tuteur_name = current ? current.tuteur_name : '';
    this.region = current ? current.region : '';
  }

}
