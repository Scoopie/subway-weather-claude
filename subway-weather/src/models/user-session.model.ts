import { UserPreferences, validateUserPreferences } from './user-preferences.model';
import { ValidationResult, combine, validateMaxLength } from './validation';

export interface UserSession {
  currentRouteId?: string;
  savedRoutes: string[];
  preferences: UserPreferences;
}

export function validateUserSession(session: UserSession): ValidationResult {
  const errors: ValidationResult[] = [];
  errors.push(validateUserPreferences(session.preferences));
  errors.push(validateMaxLength('savedRoutes', session.savedRoutes, 10));
  if (session.currentRouteId && !session.savedRoutes.includes(session.currentRouteId)) {
    errors.push({ valid: false, errors: ['currentRouteId must exist in savedRoutes'] });
  }
  return combine(...errors);
}
