import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { find } from 'rxjs';
import {ChartModel} from '../interfaces/chartmodel'

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public barData: ChartModel[];
  public pieData: ChartModel[];
  private hubConnection: signalR.HubConnection
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7015/chart')
        .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    public addTransferChartDataListener = () => {
      this.hubConnection.on('transferchartdata', (data: ChartModel[]) => {
console.log(data)
       this.barData = data;
    })
  }
}
