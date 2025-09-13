import { Coordinates, validateCoordinates } from './coordinates.model';
import { TemperatureReading } from './temperature-reading.model';
import { ValidationResult, combine } from './validation';

export interface RoutePoint {
  coordinates: Coordinates;
  sequenceIndex: number;
  distanceFromStart: number; // km
  temperatureReading?: TemperatureReading;
}

export function validateRoutePoint(value: RoutePoint, previous?: RoutePoint): ValidationResult {
  const errors: ValidationResult[] = [];
  if (value.sequenceIndex < 0 || !Number.isInteger(value.sequenceIndex)) {
    errors.push({ valid: false, errors: ['sequenceIndex must be a non-negative integer'] });
  }
  if (typeof value.distanceFromStart !== 'number' || value.distanceFromStart < 0) {
    errors.push({ valid: false, errors: ['distanceFromStart must be non-negative'] });
  }
  if (previous && value.distanceFromStart < previous.distanceFromStart) {
    errors.push({ valid: false, errors: ['distanceFromStart must increase'] });
  }
  errors.push(validateCoordinates(value.coordinates));
  return combine(...errors);
}
