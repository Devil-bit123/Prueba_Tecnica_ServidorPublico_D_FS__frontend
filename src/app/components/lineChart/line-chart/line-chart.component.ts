import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent {
  data: any[] = [];
  itsLoading=false;

  constructor(private covidDataService: DashboardService) { }

  ngOnInit(): void {
    this.itsLoading=true;
    this.covidDataService.getData().subscribe(data => {
      this.itsLoading=false;
      this.data = data;
      this.initChart();
    });
  }

  formatDate(dateNum: number): string {
    const dateStr = dateNum.toString();
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  initChart(): void {
    const dates = this.data.map(item => this.formatDate(item.date));
    const positiveIncrease = this.data.map(item => item.positiveIncrease);
    const negativeIncrease = this.data.map(item => item.negativeIncrease);
    const deathIncrease = this.data.map(item => item.deathIncrease);
    const hospitalizedIncrease = this.data.map(item => item.hospitalizedIncrease);

    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);

    const option = {
      grid: {
        bottom: 100
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Positive Increase', 'Negative Increase', 'Death Increase', 'Hospitalized Increase']
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          rotate: 90
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        { name: 'Positive Increase', type: 'line', data: positiveIncrease },
        { name: 'Negative Increase', type: 'line', data: negativeIncrease },
        { name: 'Death Increase', type: 'line', data: deathIncrease },
        { name: 'Hospitalized Increase', type: 'line', data: hospitalizedIncrease }
      ]
    };

    myChart.setOption(option);
  }

}
