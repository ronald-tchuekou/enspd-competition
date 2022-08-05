/*
 * Copyright (c) 30/07/2022 06:28
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';
import { CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { DepartementsService } from '../../services/departements.service';
import { Diplome, DiplomesService } from '../../services/diplome.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { Option, OptionsService } from '../../services/options.service';
import { Region, RegionsService } from '../../services/regions.service';

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
  filieres: any[] = [];
  options: any[] = [];
  departments: any[] = [];
  regions: any[] = [];
  diplomes: any[] = [];

  constructor(
    private candidateService: CandidatesService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private regionsService: RegionsService,
    private departementsService: DepartementsService,
    private diplomesService: DiplomesService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentCandidate']) {
      const c = changes['currentCandidate'].currentValue;
      this.candidate = {
        ...c,
        region_origine: this.getRegion(c.region_origine),
        depart_origine: this.getDepartement(c.depart_origine),
        filiere_choisie: this.getFiliere(c.filiere_choisie),
        option_choisie: this.getOption(c.option_choisie),
        diplome_entree: this.getDiplome(c.diplome_entree)
      };
    }
  }

  ngOnInit(): void {
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
