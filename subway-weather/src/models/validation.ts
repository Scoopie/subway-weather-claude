// Shared validation utilities for domain models
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function ok(): ValidationResult {
  return { valid: true, errors: [] };
}

export function fail(...errors: string[]): ValidationResult {
  return { valid: false, errors };
}

export function combine(...results: ValidationResult[]): ValidationResult {
  const errors = results.flatMap(r => r.errors);
  return { valid: errors.length === 0, errors };
}

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function validateLatitude(lat: number): ValidationResult {
  if (typeof lat !== 'number' || Number.isNaN(lat)) return fail('Latitude must be a number');
  if (lat < -90 || lat > 90) return fail('Latitude out of range (-90 to 90)');
  return ok();
}

export function validateLongitude(lng: number): ValidationResult {
  if (typeof lng !== 'number' || Number.isNaN(lng)) return fail('Longitude must be a number');
  if (lng < -180 || lng > 180) return fail('Longitude out of range (-180 to 180)');
  return ok();
}

export function validateNotEmpty(name: string, value: string | undefined | null): ValidationResult {
  if (!value || value.trim().length === 0) return fail(`${name} must be non-empty`);
  return ok();
}

export function validateEnum<T extends string>(name: string, value: any, allowed: readonly T[]): ValidationResult {
  if (!allowed.includes(value)) return fail(`${name} must be one of: ${allowed.join(', ')}`);
  return ok();
}

export function validateMaxLength(name: string, arr: any[], max: number): ValidationResult {
  if (arr.length > max) return fail(`${name} must not exceed ${max} items`);
  return ok();
}
