/*
 * Copyright (c) 30/07/2022 06:44
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Candidate, CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { ConstantsService } from '../../services/constants.service';
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
  region_origine: number = -1;
  depart_origine: number = -1;
  statut_mat: string = '';
  sexe: Sexe = Sexe.M;
  nationalite: string = '';
  nom_pere: string = '';
  prof_pere: string = '';
  nom_mere: string = '';
  prof_mere: string = '';
  cursus: Cursus = Cursus.IN;
  niveau: number = 1;
  filiere_choisie: number = -1;
  option_choisie: number = -1;
  diplome_entree: number = -1;
  sex_content: any[] = [
    { label: 'Masculin', value: Sexe.M },
    { label: 'Féminin', value: Sexe.F }
  ];
  status_matrimoniales: any[] = [
    { label: 'Marié', value: 'Marié' },
    { label: 'Célibataire', value: 'Célibataire' }
  ];
  all_cursus: any[] = [
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
    private diplomesService: DiplomesService,
    public constantService: ConstantsService
  ) {
  }

  ngOnInit(): void {
    this.title = this.currentCandidate ?
      'Modification des informations du candidat' :
      'Ajout d\'un nouveau candidat dans la liste';
    this.initData(this.currentCandidate);
    this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
      this.filieres = data.map(item => ({ label: item.libelle, value: item.id }));
    });
    this.optionsService.getOptions().subscribe((data: Option[]) => {
      this.options = data.map(item => ({ label: item.libelle, value: item.id }));
    });
    this.regionsService.getRegions().subscribe((data: Region[]) => {
      this.regions = data.map(item => ({ label: item.libelle, value: item.id }));
    });
    this.diplomesService.getDiplomes().subscribe((data: Diplome[]) => {
      this.diplomes = data.map(item => ({ label: item.libelle, value: item.id }));
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

}
