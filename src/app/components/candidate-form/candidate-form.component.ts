/*
 * Copyright (c) 30/07/2022 06:44
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate, CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { DepartementsService } from '../../services/departements.service';
import { Diplome, DiplomesService } from '../../services/diplome.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { Option, OptionsService } from '../../services/options.service';
import { Region, RegionsService } from '../../services/regions.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styles: []
})
export class CandidateFormComponent implements OnInit, OnChanges {
  @Input() currentCandidate: Candidate | null = null;
  @Output() onBackClick = new EventEmitter();
  title: string = '';
  nom: string = '';
  prenom: string = '';
  date_nais: string = '';
  lieu_nais: string = '';
  region_origine: string = '';
  depart_origine: string = '';
  statut_mat: string = '';
  sexe: string = '';
  nationalite: string = '';
  nom_pere: string = '';
  prof_pere: string = '';
  nom_mere: string = '';
  prof_mere: string = '';
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
  filieres: any[] = [];
  options: any[] = [];
  departments: any[] = [];
  loading: boolean = false;
  regions: any = [];
  diplomes: any[] = [];

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
    this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
      this.filieres = [{ label: '...', value: '' },
        ...data.map(item => ({ label: item.libelle, value: item.id }))];
    });
    this.optionsService.getOptions().subscribe((data: Option[]) => {
      this.options = [{ label: '...', value: '' },
        ...data.map(item => ({ label: item.libelle, value: item.id }))];
    });
    this.regionsService.getRegions().subscribe((data: Region[]) => {
      this.regions = [{ label: '...', value: '' },
        ...data.map(item => ({ label: item.libelle, value: item.id }))];
    });
    this.departementsService.getDepartements().subscribe((data: Region[]) => {
      this.departments = [{ label: '...', value: '' },
        ...data.map(item => ({ label: item.libelle, value: item.id }))];
    });
    this.diplomesService.getDiplomes().subscribe((data: Diplome[]) => {
      this.diplomes = [{ label: '...', value: '' },
        ...data.map(item => ({ label: item.libelle, value: item.id }))];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let change = changes['currentCandidate'];
    console.log(change.currentValue);
    if (change) {
      this.title = change.currentValue ?
        'Modification des informations du candidat' :
        'Ajout d\'un nouveau candidat dans la liste';
      this.initData(change.currentValue);
    }
  }

  initData(current: any) {
    this.nom = current?.nom;
    this.prenom = current?.prenom;
    this.date_nais = current?.date_nais;
    this.lieu_nais = current?.lieu_nais;
    this.region_origine = current?.region_origine;
    this.depart_origine = current?.depart_origine;
    this.statut_mat = current?.statut_mat;
    this.sexe = current?.sexe;
    this.nationalite = current?.nationalite;
    this.nom_pere = current?.nom_pere;
    this.prof_pere = current?.prof_pere;
    this.nom_mere = current?.nom_mere;
    this.prof_mere = current?.prof_mere;
    this.cursus = current?.cursus;
    this.niveau = current?.niveau;
    this.filiere_choisie = current?.filiere_choisie;
    this.option_choisie = current?.option_choisie;
    this.diplome_entree = current?.diplome_entree;
  }

  validate() {
    return this.nom.trim() !== '' &&
      this.prenom.trim() !== '' &&
      this.date_nais !== '' &&
      this.lieu_nais.trim() !== '' &&
      this.region_origine !== '' &&
      this.depart_origine !== '' &&
      this.statut_mat !== '' &&
      this.sexe !== '' &&
      this.nationalite.trim() !== '' &&
      this.nom_pere.trim() !== '' &&
      this.prof_pere.trim() !== '' &&
      this.nom_mere.trim() !== '' &&
      this.prof_mere.trim() !== '' &&
      this.cursus !== '' &&
      this.niveau !== '' &&
      this.filiere_choisie !== '' &&
      this.option_choisie !== '';
  }

  submit() {
    if (!this.validate()) {
      this.sbr.open('Veuillez renseigner tous les champs du formulaire.',
        undefined, { duration: 3000 });
      return;
    }
    const data = {
      nom: this.nom.trim(),
      prenom: this.prenom.trim(),
      date_nais: this.date_nais,
      lieu_nais: this.lieu_nais.trim(),
      region_origine: this.region_origine,
      depart_origine: this.depart_origine,
      statut_mat: this.statut_mat,
      sexe: this.sexe,
      nationalite: this.nationalite.trim(),
      nom_pere: this.nom_pere.trim(),
      prof_pere: this.prof_pere.trim(),
      nom_mere: this.nom_mere.trim(),
      prof_mere: this.prof_mere.trim(),
      cursus: this.cursus,
      niveau: this.niveau,
      filiere_choisie: this.filiere_choisie,
      option_choisie: this.option_choisie,
      diplome_entree: this.diplome_entree
    };
    this.loading = true;
    this.candidateService.updateCandidate(data, this.currentCandidate?.id)
      .subscribe({
        next: value => {
          console.log(value);
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

}
