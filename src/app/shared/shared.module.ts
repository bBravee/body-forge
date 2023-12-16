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
  ],
  exports: [
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    ButtonModule,
  ],
  providers: [MessageService, DialogService],
})
export class SharedModule {}
