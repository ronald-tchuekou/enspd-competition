/*
 * Copyright (c) 11/08/2022 08:24
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stat-pie-chart',
  templateUrl: './stat-pie-chart.component.html',
  styles: [`

  `]
})
export class StatPieChartComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top'
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        }
      }
    }
  };

  @Input() pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  public pieChartType: 'pie' = 'pie';

  public pieChartPlugins = [DatalabelsPlugin];

  @Output() chartHover = new EventEmitter();
}
