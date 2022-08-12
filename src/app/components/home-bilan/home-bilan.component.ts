/*
 * Copyright (c) 28/07/2022 22:19
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import * as _ from 'lodash';
import { Candidate, CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { Region, RegionsService } from '../../services/regions.service';

@Component({
  selector: 'app-home-bilan',
  templateUrl: './home-bilan.component.html',
  styles: []
})
export class HomeBilanComponent implements OnInit {
  candidates: Candidate[] = [];
  passCandidates: Candidate[] = [];
  search: Candidate[] = [];
  candidates_f: Candidate[] = [];
  candidates_m: Candidate[] = [];
  filieres: any[] = [];
  regions: any[] = [];
  cursus_list: any[] = [
    { label: Cursus.SI, value: Cursus.SI },
    { label: Cursus.IN, value: Cursus.IN }
  ];
  filiere: string = '';
  cursus: string = '';
  loading: boolean = false;

  // Stats
  stats_content: {
    allCandidate: ChartData<'pie', number[], string>,
    passCandidate: ChartData<'pie', number[], string>
  } = {
    allCandidate: {
      labels: [],
      datasets: [{ data: [] }]
    },
    passCandidate: {
      labels: [],
      datasets: [{ data: [] }]
    }
  };

  constructor(
    private candidateService: CandidatesService,
    private filiereService: FilieresService,
    private regionsService: RegionsService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.candidateService.getCandidates().subscribe({
      next: (candidates1: Candidate[]) => {
        this.loading = false;
        this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
          this.filieres = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
        });
        this.regionsService.getRegions().subscribe((data: Region[]) => {
          this.regions = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
          this.getGroupContent(candidates1);
        });
        this.candidates = candidates1;
        this.search = this.candidates;
        this.getSex();
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  filiereChange(value: string) {
    this.filiere = value;
    this.filter();
  }

  optionChange(value: string) {
    this.cursus = value;
    this.filter();
  }

  filter() {
    if (this.cursus === '' && this.filiere === '') {
      this.search = this.candidates;
      this.getSex();
      this.getGroupContent(this.search);
      return;
    }
    if (this.cursus !== '' && this.filiere === '') {
      this.search = this.candidates.filter(item => item.cursus === this.cursus);
      this.getSex();
      this.getGroupContent(this.search);
      return;
    }
    if (this.cursus === '' && this.filiere !== '') {
      this.search = this.candidates.filter(item =>
        item.filiere_choisie === parseInt(this.filiere));
      this.getSex();
      this.getGroupContent(this.search);
      return;
    }
    if (this.cursus !== '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.cursus === this.cursus &&
        item.filiere_choisie === parseInt(this.filiere));
      this.getSex();
      this.getGroupContent(this.search);
      return;
    }
  }

  getSex() {
    this.candidates_m = this.search.filter(item => item.sexe === Sexe.M);
    this.candidates_f = this.search.filter(item => item.sexe === Sexe.F);
  }

  filterFilieres(query: string) {
    return this.filieres.filter(item => item.cursus === query);
  }

  getGroupContent(candidates: Candidate[]) {
    this.passCandidates = candidates.filter(item => item.admis || item.attente);
    const cc = _.countBy(candidates, 'region_origine');
    const pc = _.countBy(this.passCandidates, 'region_origine');

    const allGroupCount: number[] = this.regions.map(item => cc[item.id] || 0);
    const passGroupCount: number[] = this.regions.map(item => pc[item.id] || 0);

    const labels = this.regions.map(item => item.libelle);

    this.stats_content = {
      allCandidate: {
        labels,
        datasets: [{ data: allGroupCount }]
      },
      passCandidate: {
        labels,
        datasets: [{ data: passGroupCount }]
      }
    };

    console.log(this.stats_content);
  }
}
