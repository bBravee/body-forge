import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IToastData } from 'src/app/shared/interfaces/IToastData.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showToast(toastData: IToastData) {
    this.messageService.add({
      severity: toastData.severity,
      summary: toastData.severity,
      detail: toastData.message,
    });
  }
}
