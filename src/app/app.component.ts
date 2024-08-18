import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  selectedDate: Date;
  displayDialog: boolean = false;
  loading: boolean = false;
  shouldShowNavbar: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listenToLoading();
    this.checkNavbarVisibility();
  }

  private checkNavbarVisibility() {
    this.authService.isLoggedUser$.subscribe(
      (res) => (this.shouldShowNavbar = res)
    );
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
