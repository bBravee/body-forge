import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedDate: Date;
  displayDialog: boolean = false;
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.listenToLoading();
  }

  private listenToLoading(): void {
    this.loadingService.isLoading$.pipe(delay(0)).subscribe((loading) => {
      console.log(loading);
      this.loading = loading;
    });
  }

  showDialog(event: any) {
    this.selectedDate = event;
    this.displayDialog = true;
  }
}
