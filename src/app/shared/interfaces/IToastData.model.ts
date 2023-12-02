import { toastMessages } from '../enums/toastMessages.enum';
import { toastStatus } from '../enums/toastStatus.enum';

export interface IToastData {
  severity: toastStatus;
  message: toastMessages;
}
