/*
 * Copyright (c) 28/07/2022 22:19
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { ConstantsService } from '../../services/constants.service';
import { FilieresService } from '../../services/filieres.service';
import { OptionsService } from '../../services/options.service';
import { RegionsService } from '../../services/regions.service';

@Component({
  selector: 'app-home-bilan',
  templateUrl: './home-bilan.component.html',
  styles: []
})
export class HomeBilanComponent implements OnInit {
  candidates: any[] = [];
  search: any[] = [];
  candidates_f: any[] = [];
  candidates_m: any[] = [];
  filieres: any[] = [];
  regions: any[] = [];
  options: any[] = [];
  filiere: string = '';
  region: string = '';
  option: string = '';
  loading: boolean = false;

  constructor(
    private candidateService: CandidatesService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private regionsService: RegionsService,
    public constantService: ConstantsService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => this.candidateService.getCandidates().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.filiereService.getFilieres().subscribe((data: any) => this.filieres = data);
        this.optionsService.getOptions().subscribe((data: any) => this.options = data);
        this.regionsService.getRegions().subscribe((data: any) => this.regions = data);
        this.candidates = data;
        this.search = this.candidates;
        this.getSex();
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    }), 5000);
  }

  regionChange(value: string) {
    this.region = value;
    this.filter();
  }

  filiereChange(value: string) {
    this.filiere = value;
    this.filter();
  }

  optionChange(value: string) {
    this.option = value;
    this.filter();
  }

  filter() {
    if (this.option === '' && this.region === '' && this.filiere === '') {
      this.search = this.candidates;
      this.getSex();
      return;
    }
    if (this.option !== '' && this.region === '' && this.filiere === '') {
      this.search = this.candidates.filter(item => item.option === this.option);
      this.getSex();
      return;
    }
    if (this.option === '' && this.region !== '' && this.filiere === '') {
      this.search = this.candidates.filter(item => item.region === this.region);
      this.getSex();
      return;
    }
    if (this.option === '' && this.region === '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.filiere === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== '' && this.region !== '' && this.filiere === '') {
      this.search = this.candidates.filter(item => item.option === this.option &&
        item.region === this.region);
      this.getSex();
      return;
    }
    if (this.option === '' && this.region !== '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.region === this.region &&
        item.filiere === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== '' && this.region === '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.option === this.option &&
        item.filiere === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== '' && this.region !== '' && this.filiere !== '') {
      this.search = this.candidates.filter(item => item.option === this.option &&
        item.region === this.region && item.filiere === this.filiere);
      this.getSex();
      return;
    }
  }

  getSex() {
    this.candidates_m = this.search.filter(
      item => item.sexe === 'M' || item.sexe.toLowerCase() === 'masculin'
    );
    this.candidates_f = this.search.filter(
      item => item.sexe === 'F' || item.sexe.toLowerCase() === 'feminin'
    );
  }
}
