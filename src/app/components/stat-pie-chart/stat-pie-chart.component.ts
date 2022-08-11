/*
 * Copyright (c) 11/08/2022 08:24
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, ViewChild } from '@angular/core';
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

  // Pie
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
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Nrod', 'Sud', 'Est', 'Ouest'],
    datasets: [{
      data: [300, 500, 100, 200]
    }]
  };
  public pieChartType: 'pie' = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

}
