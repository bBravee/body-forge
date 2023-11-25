import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedUser$.subscribe((res) => {
      this.items = [
        {
          label: 'Workouts',
          routerLink: 'workout-main',
          visible: res,
        },
        {
          label: 'Statistics',
          routerLink: 'statistics',
          visible: res,
        },
        {
          label: 'Log in',
          routerLink: 'log-in',
          visible: !res,
        },
      ];
    });
  }
}
