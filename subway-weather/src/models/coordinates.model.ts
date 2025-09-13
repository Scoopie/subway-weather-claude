import { ValidationResult, combine, validateLatitude, validateLongitude } from './validation';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function validateCoordinates(value: Coordinates): ValidationResult {
  return combine(
    validateLatitude(value.latitude),
    validateLongitude(value.longitude),
  );
}
