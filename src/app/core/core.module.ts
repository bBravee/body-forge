import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [NavbarComponent, ToastComponent, LoadingSpinnerComponent],
  imports: [CommonModule, MenubarModule, SharedModule, ProgressSpinnerModule],
  exports: [NavbarComponent, ToastComponent, LoadingSpinnerComponent],
})
export class CoreModule {}
