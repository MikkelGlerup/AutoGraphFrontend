import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  barChartOptions: ChartConfiguration['options'] = {
    animation: {
      duration: 0
    },
    responsive: false,
    scales: {
      y: {
        min: 0
      }
    }
  };
  barChartLabels: string[] = ['Realm time data for the chart'];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    scales: {
      y: {
        min: 0
      }
    }
  };
  pieChartLabels: string[] = ['Realm time data for the chart'];
  pieChartType: ChartType = 'pie';
  pieChartLegend: boolean = true;
  constructor(public signalRService: SignalrService, private http: HttpClient){}

  ngOnInit(){
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:7015/api/chart')
      .subscribe(res => {
        console.log(res)
      })
  }
}
