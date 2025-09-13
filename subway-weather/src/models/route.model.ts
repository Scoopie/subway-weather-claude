import { Address, validateAddress } from './address.model';
import { RoutePoint, validateRoutePoint } from './route-point.model';
import { ValidationResult, combine, isUuid, validateMaxLength } from './validation';

export interface Route {
  id: string;
  startAddress: Address;
  endAddress: Address;
  waypoints: RoutePoint[];
  createdAt: Date;
  lastAccessedAt: Date;
}

export function validateRoute(route: Route): ValidationResult {
  const errors: ValidationResult[] = [];
  if (!isUuid(route.id)) errors.push({ valid: false, errors: ['id must be a valid UUID'] });
  errors.push(validateAddress(route.startAddress));
  errors.push(validateAddress(route.endAddress));
  if (route.startAddress.formattedAddress === route.endAddress.formattedAddress) {
    errors.push({ valid: false, errors: ['startAddress and endAddress must differ'] });
  }
  if (route.waypoints.length < 2) {
    errors.push({ valid: false, errors: ['waypoints must contain at least 2 points'] });
  }
  errors.push(validateMaxLength('waypoints', route.waypoints, 50));
  // Validate waypoint ordering
  for (let i = 0; i < route.waypoints.length; i++) {
    const current = route.waypoints[i];
    const previous = i > 0 ? route.waypoints[i - 1] : undefined;
    errors.push(validateRoutePoint(current, previous));
  }
  return combine(...errors);
}
