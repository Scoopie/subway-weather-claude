import { Coordinates, validateCoordinates } from './coordinates.model';
import { ValidationResult, combine, validateNotEmpty } from './validation';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface TemperatureReading {
  value: number;
  unit: TemperatureUnit;
  timestamp: Date;
  source: string;
  coordinates: Coordinates;
}

export function validateTemperatureReading(value: TemperatureReading, now: Date = new Date()): ValidationResult {
  const errors: ValidationResult[] = [];
  if (typeof value.value !== 'number' || Number.isNaN(value.value) || value.value < -100 || value.value > 100) {
    errors.push({ valid: false, errors: ['value must be between -100 and 100'] });
  }
  if (!(value.timestamp instanceof Date) || value.timestamp.getTime() > now.getTime()) {
    errors.push({ valid: false, errors: ['timestamp must not be in the future'] });
  }
  errors.push(validateNotEmpty('source', value.source));
  errors.push(validateCoordinates(value.coordinates));
  return combine(...errors);
}

export function isStale(reading: TemperatureReading, maxAgeMinutes = 10, now: Date = new Date()): boolean {
  const ageMinutes = (now.getTime() - reading.timestamp.getTime()) / (1000 * 60);
  return ageMinutes > maxAgeMinutes;
}
