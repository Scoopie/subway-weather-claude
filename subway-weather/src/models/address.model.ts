import { Coordinates, validateCoordinates } from './coordinates.model';
import { ValidationResult, combine, validateNotEmpty } from './validation';

export interface Address {
  formattedAddress: string;
  coordinates: Coordinates;
  placeId?: string;
}

export function validateAddress(value: Address): ValidationResult {
  return combine(
    validateNotEmpty('formattedAddress', value.formattedAddress),
    validateCoordinates(value.coordinates),
  );
}
