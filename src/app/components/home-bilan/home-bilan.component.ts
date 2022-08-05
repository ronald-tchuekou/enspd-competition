/*
 * Copyright (c) 28/07/2022 22:19
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Candidate, CandidatesService, Sexe } from '../../services/candidates.service';
import { ConstantsService } from '../../services/constants.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { Option, OptionsService } from '../../services/options.service';
import { Region, RegionsService } from '../../services/regions.service';

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
  options: any[] = [];
  filiere: number = -1;
  region: number = -1;
  option: number = -1;
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
    this.candidateService.getCandidates().subscribe({
      next: (data: Candidate[]) => {
        this.loading = false;
        this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
          this.filieres = data.map(item => ({ label: item.libelle, value: item.id }));
        });
        this.optionsService.getOptions().subscribe((data: Option[]) => {
          this.options = data.map(item => ({ label: item.libelle, value: item.id }));
        });
        this.regionsService.getRegions().subscribe((data: Region[]) => {
          this.regions = data.map(item => ({ label: item.libelle, value: item.id }));
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

  regionChange(value: string) {
    this.region = parseInt(value);
    this.filter();
  }

  filiereChange(value: string) {
    this.filiere = parseInt(value);
    this.filter();
  }

  optionChange(value: string) {
    this.option = parseInt(value);
    this.filter();
  }

  filter() {
    if (this.option === -1 && this.region === -1 && this.filiere === -1) {
      this.search = this.candidates;
      this.getSex();
      return;
    }
    if (this.option !== -1 && this.region === -1 && this.filiere === -1) {
      this.search = this.candidates.filter(item => item.option_choisie === this.option);
      this.getSex();
      return;
    }
    if (this.option === -1 && this.region !== -1 && this.filiere === -1) {
      this.search = this.candidates.filter(item => item.region_origine === this.region);
      this.getSex();
      return;
    }
    if (this.option === -1 && this.region === -1 && this.filiere !== -1) {
      this.search = this.candidates.filter(item => item.filiere_choisie === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== -1 && this.region !== -1 && this.filiere === -1) {
      this.search = this.candidates.filter(item => item.option_choisie === this.option &&
        item.region_origine === this.region);
      this.getSex();
      return;
    }
    if (this.option === -1 && this.region !== -1 && this.filiere !== -1) {
      this.search = this.candidates.filter(item => item.region_origine === this.region &&
        item.filiere_choisie === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== -1 && this.region === -1 && this.filiere !== -1) {
      this.search = this.candidates.filter(item => item.option_choisie === this.option &&
        item.filiere_choisie === this.filiere);
      this.getSex();
      return;
    }
    if (this.option !== -1 && this.region !== -1 && this.filiere !== -1) {
      this.search = this.candidates.filter(item => item.option_choisie === this.option &&
        item.region_origine === this.region && item.filiere_choisie === this.filiere);
      this.getSex();
      return;
    }
  }

  getSex() {
    this.candidates_m = this.search.filter(item => item.sexe === Sexe.M);
    this.candidates_f = this.search.filter(item => item.sexe === Sexe.F);
  }
}
