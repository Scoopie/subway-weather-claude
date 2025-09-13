/**
 * Geocoding Service Contract
 * Handles address autocomplete and coordinate conversion
 */

export interface AddressSuggestion {
  formattedAddress: string;
  placeId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface GeocodingService {
  /**
   * Get address suggestions for autocomplete
   * @param query - Partial address string
   * @param limit - Maximum number of suggestions (default: 5)
   * @returns Promise of address suggestions
   */
  getAddressSuggestions(query: string, limit?: number): Promise<AddressSuggestion[]>;

  /**
   * Get detailed address information from place ID
   * @param placeId - Google Places API place ID
   * @returns Promise of full address details
   */
  getAddressDetails(placeId: string): Promise<AddressSuggestion>;

  /**
   * Convert coordinates to formatted address (reverse geocoding)
   * @param latitude - Latitude in decimal degrees
   * @param longitude - Longitude in decimal degrees
   * @returns Promise of formatted address
   */
  reverseGeocode(latitude: number, longitude: number): Promise<string>;
}

// Error types
export class GeocodingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'GeocodingError';
  }
}

export class InvalidCoordinatesError extends GeocodingError {
  constructor() {
    super('Invalid coordinates provided', 'INVALID_COORDINATES');
  }
}

export class AddressNotFoundError extends GeocodingError {
  constructor(query: string) {
    super(`Address not found: ${query}`, 'ADDRESS_NOT_FOUND');
  }
}

export class QuotaExceededError extends GeocodingError {
  constructor() {
    super('API quota exceeded', 'QUOTA_EXCEEDED');
  }
}