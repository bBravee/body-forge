import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TableModule,
    RouterModule,
  ],
  exports: [
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    TableModule,
    RouterModule,
  ],
  providers: [MessageService, DialogService],
})
export class SharedModule {}
