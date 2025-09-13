import { ValidationResult, combine, validateEnum } from './validation';

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type ColorScheme = 'blue-red' | 'cool-warm';

export interface UserPreferences {
  temperatureUnit: TemperatureUnit;
  colorScheme: ColorScheme;
  autoRefreshMinutes: number;
  showLocationNames: boolean;
}

const TEMP_UNITS: readonly TemperatureUnit[] = ['celsius', 'fahrenheit'] as const;
const COLOR_SCHEMES: readonly ColorScheme[] = ['blue-red', 'cool-warm'] as const;

export function validateUserPreferences(prefs: UserPreferences): ValidationResult {
  const errors: ValidationResult[] = [];
  errors.push(validateEnum('temperatureUnit', prefs.temperatureUnit, TEMP_UNITS));
  errors.push(validateEnum('colorScheme', prefs.colorScheme, COLOR_SCHEMES));
  if (typeof prefs.autoRefreshMinutes !== 'number' || prefs.autoRefreshMinutes < 5 || prefs.autoRefreshMinutes > 60) {
    errors.push({ valid: false, errors: ['autoRefreshMinutes must be between 5 and 60'] });
  }
  if (typeof prefs.showLocationNames !== 'boolean') {
    errors.push({ valid: false, errors: ['showLocationNames must be boolean'] });
  }
  return combine(...errors);
}
