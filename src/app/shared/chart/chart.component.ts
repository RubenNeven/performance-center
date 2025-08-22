import {Component, computed, inject, input, OnInit, signal, ViewEncapsulation} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';
import {EChartsCoreOption} from 'echarts';
import {HealthService} from '../../services/health.service';
import {Dialog} from '@angular/cdk/dialog';
import {AddHealthDataComponent} from '../../components/dashboard/add-health-data/add-health-data.component';
import {HealthData} from '../models/models';

@Component({
  selector: 'app-chart',
  imports: [NgxEchartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'canvas'
  }
})
export class ChartComponent implements OnInit{


  height = input('500px');

  private healthService = inject(HealthService);
  healthData = this.healthService.healthData$;
  private dialog = inject(Dialog);

  ngOnInit(): void {
    this.healthService.getHealthData().subscribe();
  }

  chartOption = computed<EChartsCoreOption>(() => ({
    title: {
      text: 'Health',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      top: 'bottom'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.healthData().map((data) => new Date(data.date).toLocaleDateString()),
      axisLabel: {
        interval: 0,
        rotate: 45
      },
    },

    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Rest HR',
        data: this.healthData().map((data) => data.hr),
        type: 'line',
        itemStyle: {
          color: '#ff0000'
        }

      },
      {
        name: 'Weight',
        data: this.healthData().map((data) => data.weight),
        type: 'line',
        itemStyle: {
          color: '#007bff'
        }
      },
    ]
  }));




  openDialog() {
    this.dialog.open(AddHealthDataComponent);

  }


}
