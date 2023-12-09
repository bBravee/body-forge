import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DynamicDialogModule,
    ButtonModule,
  ],
  exports: [
    ToastModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    DynamicDialogModule,
    ButtonModule,
  ],
  providers: [MessageService],
})
export class SharedModule {}
