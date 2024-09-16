import { Component } from '@angular/core';
import { LineChartComponent } from "../../../components/lineChart/line-chart/line-chart.component";

@Component({
  selector: 'app-covid-dashboard',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './covid-dashboard.component.html',
  styleUrl: './covid-dashboard.component.css'
})
export class CovidDashboardComponent {

}
