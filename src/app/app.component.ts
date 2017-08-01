import { Component } from '@angular/core';
import {ValuesService} from './values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ValuesService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() =>{
      resolve('stable');
    }, 2000);
  });

  constructor(private valueService: ValuesService) {}
  servers = this.valueService.getValue();

  filteredStatus = '';
  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical'
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'Some Server',
      status: 'stable',
      started: new Date(15, 1, 2017),
    });
  }
}
