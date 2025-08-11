import {Component, ViewEncapsulation} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'canvas'
  }
})
export class ChartComponent {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      new Date(2025, 7, 5).toLocaleDateString(),
      new Date(2025, 7, 6).toLocaleDateString(),
      new Date(2025, 7, 4).toLocaleDateString(),
      new Date(2025, 7, 7).toLocaleDateString(),
      new Date(2025, 7, 9).toLocaleDateString(),
      new Date(2025, 7, 10).toLocaleDateString(),
    ],
    datasets: [
      {
        data: [55, 52, 40, 38, 45, 41, 52],
        label: 'Rest HR',
        borderColor: 'rgba(255,0,0,0.3)',
        backgroundColor: 'rgba(255,0,0,0.3)'
      },
      {
        data: [76, 75.2, 74, 78, 75, 74.8, 74.9],
        label: 'Weight',
        borderColor: 'rgba(0,72,255,0.3)',
        backgroundColor: 'rgba(0,72,255,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      y: {
        suggestedMin: 20,
        suggestedMax: 100
      }
    }
  };

}
