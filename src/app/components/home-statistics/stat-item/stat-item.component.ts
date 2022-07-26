/*
 * Copyright (c) 15/08/2022 20:00
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';
import * as _ from 'lodash';
import { Candidate } from '../../../services/candidates.service';
import { ConstantsService } from '../../../services/constants.service';
import { DEFAULT_REGION, Region } from '../../../services/regions.service';

@Component({
  selector: 'app-stat-item',
  templateUrl: './stat-item.component.html',
  styles: []
})
export class StatItemComponent implements OnInit, OnChanges {
  @Input() candidateCount: number = 0;
  @Input() title_label: string = '';
  @Input() content: Candidate[] = [];
  @Input() regions: Region[] = [];
  regionGroups: _.Dictionary<Candidate[]> = {};
  currentRegion: Region = DEFAULT_REGION;

  stats_content: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  constructor(public constantsService: ConstantsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['content'];
    if (change) {
      this.content = change.currentValue.filter((item: any) =>
        this.regions.find(region => region.id === item.region_origine) !== undefined
      );
      this.getGroupContent();
    }
  }

  getGroupContent() {
    this.regionGroups = _.groupBy(this.content, 'region_origine');

    const groupCount: number[] = this.regions.map(item => {
      if (this.regionGroups[item.id])
        return this.regionGroups[item.id].length || 0;
      return 0;
    });

    const datasets = [{ data: groupCount }];
    this.stats_content = {
      labels: this.regions.map((item, i) => item.abreviation + ' ' + this.constantsService.getPercentage(
        this.candidateCount, datasets[0].data[i]
      ) + '%'),
      datasets
    };

  }

  getCandidateRegion(region_id: number) {
    return this.content.filter(item => item.region_origine === region_id);
  }

  getTotal() {
    let result = 0;
    this.stats_content.datasets[0].data.forEach(item => result += item);
    return result;
  }

  getFilterRegion() {
    if (this.currentRegion.id === 0)
      return this.content;
    return this.content.filter(item => item.region_origine === this.currentRegion.id);
  }

  getSexeM(candidates: Candidate[]) {
    return candidates.filter(item => item.sexe === 'Masculin');
  }

  getSexeF(candidates: Candidate[]) {
    return candidates.filter(item => item.sexe === 'Feminin');
  }

  getPercentM(c: any[]) {
    return this.constantsService.getPercentage(c.length, this.getSexeM(c).length);
  }

  getPercentF(c: any[]) {
    return this.constantsService.getPercentage(c.length, this.getSexeF(c).length);
  }

}
