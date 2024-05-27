import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
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
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    RouterModule,
    DropdownModule,
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
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    RouterModule,
    DropdownModule,
  ],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class SharedModule {}
