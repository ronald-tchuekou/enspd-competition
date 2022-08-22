/*
 * Copyright (c) 30/07/2022 06:44
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate, CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { DepartementsService } from '../../services/departements.service';
import { DiplomesService } from '../../services/diplome.service';
import { FilieresService } from '../../services/filieres.service';
import { OptionsService } from '../../services/options.service';
import { RegionsService } from '../../services/regions.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styles: []
})
export class CandidateFormComponent implements OnInit, OnChanges {
  @Input() currentCandidate: Candidate | null = null;
  @Output() onBackClick = new EventEmitter();
  @Output() onComplete = new EventEmitter();
  title: string = '';
  anonymous_num: string = '';
  anonymous_num2: string = '';
  nom: string = '';
  prenom: string = '';
  date_nais: string = '';
  lieu_nais: string = '';
  region_origine: string = '';
  depart_origine: string = '';
  statut_mat: string = '';
  sexe: string = '';
  nationalite: string = '';
  note1: string = '';
  note2: string = '';
  note3: string = '';
  average: string = '';
  range: string = '';
  cursus: string = '';
  niveau: string = '';
  filiere_choisie: string = '';
  option_choisie: string = '';
  diplome_entree: string = '';
  sex_content: any[] = [
    { label: '...', value: '' },
    { label: 'Masculin', value: Sexe.M },
    { label: 'Féminin', value: Sexe.F }
  ];
  status_matrimoniales: any[] = [
    { label: '...', value: '' },
    { label: 'Marié', value: 'Marié' },
    { label: 'Célibataire', value: 'Célibataire' }
  ];
  all_cursus: any[] = [
    { label: '...', value: '' },
    { label: Cursus.IN, value: Cursus.IN },
    { label: Cursus.SI, value: Cursus.SI }
  ];
  loading: boolean = false;
  @Input() filieres: any[] = [];
  @Input() options: any[] = [];
  @Input() departments: any[] = [];
  @Input() regions: any[] = [];
  @Input() diplomes: any[] = [];
  niveaux: any[] = [
    { label: '...', value: '' },
    { label: 'Niveau 1', value: 1 },
    { label: 'Niveau 3', value: 3 }
  ];

  constructor(
    private candidateService: CandidatesService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private regionsService: RegionsService,
    private departementsService: DepartementsService,
    private diplomesService: DiplomesService,
    private sbr: MatSnackBar
  ) {
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
    this.anonymous_num = current?.anonymous_num || '';
    this.anonymous_num2 = current?.anonymous_num2 || '';
    this.nom = current?.nom || '';
    this.prenom = current?.prenom || '';
    this.date_nais = current?.date_nais || '';
    this.lieu_nais = current?.lieu_nais || '';
    this.region_origine = current?.region_origine || '';
    this.depart_origine = current?.depart_origine || '';
    this.statut_mat = current?.statut_mat || '';
    this.sexe = current?.sexe || '';
    this.nationalite = current?.nationalite || '';
    this.note1 = current?.note1 || '';
    this.note2 = current?.note2 || '';
    this.note3 = current?.note3 || '';
    this.average = current?.average || '';
    this.range = current?.range || '';
    this.cursus = current?.cursus || '';
    this.niveau = current?.niveau || '';
    this.filiere_choisie = current?.filiere_choisie || '';
    this.option_choisie = current?.option_choisie || '';
    this.diplome_entree = current?.diplome_entree || '';
  }

  validate() {
    return this.nom.trim() !== '' &&
      this.date_nais !== '' &&
      this.lieu_nais.trim() !== '' &&
      this.region_origine !== '' &&
      this.sexe !== '' &&
      this.nationalite.trim() !== '' &&
      this.cursus !== '' &&
      this.niveau !== '' &&
      this.diplome_entree !== '';
  }

  submit() {
    console.log(this.prenom);
    if (!this.validate()) {
      this.sbr.open('Veuillez renseigner tous les champs obligatoires (*) du formulaire.',
        undefined, { duration: 5000 });
      return;
    }
    const data = {
      anonymous_num: this.anonymous_num === '' ? null : parseInt(this.anonymous_num),
      anonymous_num2: this.anonymous_num2 === '' ? null : parseInt(this.anonymous_num2),
      nom: this.nom.trim(),
      prenom: this.prenom.trim(),
      date_nais: this.date_nais === '' ? null : this.date_nais,
      lieu_nais: this.lieu_nais.trim(),
      region_origine: this.region_origine === '' ? null : parseInt(this.region_origine),
      depart_origine: this.depart_origine === '' ? null : parseInt(this.depart_origine),
      statut_mat: this.statut_mat === '' ? null : this.statut_mat,
      sexe: this.sexe === '' ? null : this.sexe,
      nationalite: this.nationalite.trim(),
      note1: this.note1 === '' ? null : parseFloat(this.note1),
      note2: this.note2 === '' ? null : parseFloat(this.note2),
      note3: this.note3 === '' ? null : parseFloat(this.note3),
      average: this.calcAverage(),
      range: this.range === '' ? null : parseInt(this.range),
      cursus: this.cursus === '' ? null : this.cursus,
      niveau: this.niveau === '' ? null : parseInt(this.niveau),
      filiere_choisie: this.filiere_choisie === '' ? null : parseInt(this.filiere_choisie),
      option_choisie: this.option_choisie === '' ? null : parseInt(this.option_choisie),
      diplome_entree: this.diplome_entree === '' ? null : parseInt(this.diplome_entree)
    };
    this.loading = true;
    this.candidateService.updateCandidate(data, this.currentCandidate?.id)
      .subscribe({
        next: () => {
          this.onComplete.emit({ ...this.currentCandidate, ...data });
          this.loading = false;
          this.sbr.open('Les information du candidat on été modifié',
            undefined, { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          if (err.error)
            this.sbr.open(err.error.message, undefined, { duration: 3000 });
          else
            this.sbr.open('Une erreur est survenue', undefined, { duration: 3000 });
        }
      });
  }

  filterFilieres(query: string) {
    return this.filieres.filter(item => item.cursus === query || item.value === '');
  }

  filterOptions(query: string) {
    const query1 = parseInt(query);
    return this.options.filter(item => item.filiere_id === query1 || item.value === '');
  }

  calcAverage() {
    const note1 = this.note1 === '' ? 0 : parseFloat(this.note1);
    const note2 = this.note2 === '' ? 0 : parseFloat(this.note2);
    const note3 = this.note3 === '' ? 0 : parseFloat(this.note3);

    let average: string;

    if (this.currentCandidate?.niveau === 1) {
      average = ((note1 * 3 + note2 * 3 + note3) / 7).toFixed(2);
    } else {
      average = ((note1 * 3 + note2) / 4).toFixed(2);
    }

    this.average = average;
    return parseFloat(average);
  }
}
