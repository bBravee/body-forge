import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedDate: Date;
  displayDialog: boolean = false;
  items: MenuItem[];

  private initializeMenu(): void {
    this.items = [
      {
        label: 'Workout',
        routerLink: '/workout-main',
      },
      {
        label: 'stats',
        routerLink: '/statistics',
      },
    ];
  }

  ngOnInit(): void {
    this.initializeMenu();
  }

  showDialog(event: any) {
    this.selectedDate = event;
    this.displayDialog = true;
  }
}
