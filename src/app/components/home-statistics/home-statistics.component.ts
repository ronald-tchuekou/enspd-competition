/*
 * Copyright (c) 15/08/2022 19:50
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Candidate, CandidatesService } from '../../services/candidates.service';
import { Collection, DEFAULT_COLLECTION } from '../../services/collection.service';
import { FilieresService } from '../../services/filieres.service';
import { Region, RegionsService } from '../../services/regions.service';

@Component({
  selector: 'app-home-statistics',
  templateUrl: './home-statistics.component.html',
  styles: []
})
export class HomeStatisticsComponent implements OnInit, OnChanges {
  @Input() currentCollection: Collection = DEFAULT_COLLECTION;
  regions: Region[] = [];
  filieres: any[] = [];
  candidates: Candidate[] = [];
  searchCandidates: Candidate[] = [];
  admisCandidates: Candidate[] = [];
  attenteCandidates: Candidate[] = [];
  loading: boolean = false;
  filiere: string = '';

  constructor(
    private candidateService: CandidatesService,
    private regionService: RegionsService,
    private filiereService: FilieresService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['currentCollection'];
    if (change && change.currentValue.id !== 0) {
      this.getCandidates();
    }
  }

  getCandidates() {
    this.loading = true;
    this.filiereService.getFilieresBy({ cursus: this.currentCollection.cursus }).subscribe({
      next: (data_d) => {
        this.filieres = _.sortBy(data_d.map(item => ({ ...item, label: item.libelle, value: item.id })),
          'libelle');
        this.regionService.getRegions().subscribe({
          next: (data: any) => {
            this.regions = _.sortBy(data, 'libelle');
            this.candidateService.getCandidatesBy({ collection_id: this.currentCollection.id })
              .subscribe({
                next: (data: any) => {
                  this.loading = false;
                  this.candidates = data;
                  this.searchCandidates = this.candidates;
                  this.admisCandidates = this.searchCandidates.filter(item => item.admis);
                  this.attenteCandidates = this.searchCandidates.filter(item => item.attente);
                },
                error: (error: any) => {
                  this.loading = false;
                  console.log('Error when get candidates list : ', error);
                }
              });
          },
          error: (error: any) => {
            this.loading = false;
            console.log('Error when get candidates list : ', error);
          }
        });
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  filiereChange(value: string) {
    this.filiere = value;
    this.filterContent();
  }

  filterContent() {
    if (this.filiere === '') {
      this.searchCandidates = this.candidates;
      this.admisCandidates = this.searchCandidates.filter(item => item.admis);
      this.attenteCandidates = this.searchCandidates.filter(item => item.attente);
      return;
    }

    this.searchCandidates = this.candidates.filter(
      item => item.filiere_choisie === parseInt(this.filiere)
    );
    this.admisCandidates = this.searchCandidates.filter(item => item.admis);
    this.attenteCandidates = this.searchCandidates.filter(item => item.attente);
    return;
  }

}
