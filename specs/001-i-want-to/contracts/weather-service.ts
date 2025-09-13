/**
 * Weather Service Contract
 * Handles temperature data retrieval from Weather Underground API
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TemperatureReading {
  value: number;
  unit: 'celsius' | 'fahrenheit';
  timestamp: Date;
  coordinates: Coordinates;
  source: string;
}

export interface WeatherService {
  /**
   * Get current temperature at a specific location
   * @param coordinates - Location coordinates
   * @returns Promise of temperature reading
   */
  getCurrentTemperature(coordinates: Coordinates): Promise<TemperatureReading>;

  /**
   * Get temperature readings for multiple locations (batch request)
   * @param coordinatesList - Array of coordinates
   * @returns Promise of temperature readings array
   */
  getBatchTemperatures(coordinatesList: Coordinates[]): Promise<TemperatureReading[]>;

  /**
   * Check if temperature data is fresh (within 10 minutes)
   * @param reading - Temperature reading to check
   * @returns True if data is fresh, false if expired
   */
  isDataFresh(reading: TemperatureReading): boolean;

  /**
   * Convert temperature between units
   * @param value - Temperature value
   * @param fromUnit - Source unit
   * @param toUnit - Target unit
   * @returns Converted temperature value
   */
  convertTemperature(
    value: number,
    fromUnit: 'celsius' | 'fahrenheit',
    toUnit: 'celsius' | 'fahrenheit'
  ): number;
}

// Error types
export class WeatherError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'WeatherError';
  }
}

export class WeatherDataNotFoundError extends WeatherError {
  constructor(coordinates: Coordinates) {
    super(
      `No weather data available for location: ${coordinates.latitude},${coordinates.longitude}`,
      'DATA_NOT_FOUND'
    );
  }
}

export class WeatherApiError extends WeatherError {
  constructor(statusCode: number, message: string) {
    super(`Weather API error (${statusCode}): ${message}`, 'API_ERROR');
  }
}

export class RateLimitExceededError extends WeatherError {
  constructor() {
    super('Weather API rate limit exceeded', 'RATE_LIMIT_EXCEEDED');
  }
}