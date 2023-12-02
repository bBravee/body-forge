import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastModule],
  exports: [ToastModule],
  providers: [MessageService],
})
export class SharedModule {}
