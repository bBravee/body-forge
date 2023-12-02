import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, ToastComponent],
  imports: [CommonModule, MenubarModule, SharedModule],
  exports: [NavbarComponent, ToastComponent],
})
export class CoreModule {}
