import { CanDeactivateFn } from '@angular/router';


export const canComponentDeactivateGuard: CanDeactivateFn<unknown> =
  (component: any, currentRoute, currentState, nextState) => {
    if (component?.isDirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');

    } else {
      return true
    }
  };
