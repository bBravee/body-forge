import { CanDeactivateType } from './CanDeactivateType.type';

export interface CanComponentDeactivate {
  canDeactivate: () => CanDeactivateType;
}
