import { canComponentDeactivateGuard } from './can-component-deactivate-guard';

describe('canComponentDeactivateGuard', () => {
  let mockComponent: any;

  beforeEach(() => {
    mockComponent = {};
  });

  afterEach(() => {
    // restore original confirm method after each test
    (window.confirm as any).and?.callThrough?.();
  });

  it('should allow deactivation when component is not dirty', () => {
    mockComponent.isDirty = false;

    const result = canComponentDeactivateGuard(mockComponent, null as any, null as any, null as any);

    expect(result).toBeTrue();
  });

  it('should ask for confirmation when component is dirty', () => {
    mockComponent.isDirty = true;
    spyOn(window, 'confirm').and.returnValue(true);

    const result = canComponentDeactivateGuard(mockComponent, null as any, null as any, null as any);

    expect(window.confirm).toHaveBeenCalledWith('You have unsaved changes. Do you really want to leave?');
    expect(result).toBeTrue();
  });

  it('should prevent navigation if user cancels confirmation', () => {
    mockComponent.isDirty = true;
    spyOn(window, 'confirm').and.returnValue(false);

    const result = canComponentDeactivateGuard(mockComponent, null as any, null as any, null as any);

    expect(window.confirm).toHaveBeenCalled();
    expect(result).toBeFalse();
  });

  it('should return true if component does not have isDirty property', () => {
    delete mockComponent.isDirty;

    const result = canComponentDeactivateGuard(mockComponent, null as any, null as any, null as any);

    expect(result).toBeTrue();
  });
});