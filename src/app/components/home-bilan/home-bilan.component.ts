/*
 * Copyright (c) 28/07/2022 22:19
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Candidate, CandidatesService, Cursus, Sexe } from '../../services/candidates.service';
import { Filiere, FilieresService } from '../../services/filieres.service';

@Component({
  selector: 'app-home-bilan',
  templateUrl: './home-bilan.component.html',
  styles: []
})
export class HomeBilanComponent implements OnInit {
  candidates: Candidate[] = [];
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

  constructor(
    private candidateService: CandidatesService,
    private filiereService: FilieresService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.candidateService.getCandidates().subscribe({
      next: (data: Candidate[]) => {
        this.loading = false;
        this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
          this.filieres = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
        });
        this.candidates = data;
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
      return;
    }
    if (this.cursus !== '' && this.filiere === '') {
      this.search = this.candidates.filter(item => item.cursus === this.cursus);
      this.getSex();
      return;
    }
    if (this.cursus === '' && this.filiere !== '') {
      this.search = this.candidates.filter(item =>
        item.filiere_choisie === parseInt(this.filiere));
      this.getSex();
      return;
    }
    if (this.cursus !== '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.cursus === this.cursus &&
        item.filiere_choisie === parseInt(this.filiere));
      this.getSex();
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

}
