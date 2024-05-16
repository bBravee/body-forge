import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/workout/models/ICanComponentDeactivate.interface';

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate
) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
