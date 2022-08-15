/*
 * Copyright (c) 15/08/2022 20:00
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';
import * as _ from 'lodash';
import { Candidate } from '../../../services/candidates.service';
import { DEFAULT_REGION, Region } from '../../../services/regions.service';

@Component({
  selector: 'app-stat-item',
  templateUrl: './stat-item.component.html',
  styles: []
})
export class StatItemComponent implements OnInit, OnChanges {
  @Input() title_label: string = '';
  @Input() content: Candidate[] = [];
  @Input() regions: Region[] = [];
  regionGroups: _.Dictionary<Candidate[]> = {};
  currentRegion: Region = DEFAULT_REGION;

  stats_content: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['content'];
    if (change) {
      this.content = change.currentValue;
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

    const labels = this.regions.map(item => item.libelle)
      .filter((item, index) => groupCount[index] > 0);

    this.stats_content = {
      labels,
      datasets: [{ data: groupCount.filter(item => item > 0) }]
    };

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

  getPercentM() {
    const c = this.getFilterRegion();
    if (c.length === 0) return 0;
    return (this.getSexeM(c).length * 100 / c.length).toFixed(2);
  }

  getPercentF() {
    const c = this.getFilterRegion();
    if (c.length === 0) return 0;
    return (this.getSexeF(c).length * 100 / c.length).toFixed(2);
  }

  chartHovered({ active }: { active: any[] }): void {
    if (active[0] && this.stats_content.labels) {
      const c = this.stats_content.labels[active[0].index];
      const currentRegion = this.regions.find(item => item.libelle === c) || DEFAULT_REGION;
      if (this.currentRegion.id !== currentRegion.id) {
        this.currentRegion = currentRegion;
      }
    } else {
      if (this.currentRegion.id !== DEFAULT_REGION.id) {
        this.currentRegion = DEFAULT_REGION;
      }
    }
  }
}
