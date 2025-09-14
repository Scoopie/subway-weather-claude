import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Coordinates, TemperatureReading, WeatherService as WeatherServiceContract, WeatherApiError, WeatherDataNotFoundError } from '../../../specs/001-i-want-to/contracts/weather-service';
import { validateTemperatureReading } from '../models/temperature-reading.model';

@Injectable({ providedIn: 'root' })
export class WeatherService implements WeatherServiceContract {
  private http = inject(HttpClient);

  async getCurrentTemperature(coordinates: Coordinates): Promise<TemperatureReading> {
    throw new Error('NotImplemented: getCurrentTemperature');
  }

  async getBatchTemperatures(coordinatesList: Coordinates[]): Promise<TemperatureReading[]> {
    throw new Error('NotImplemented: getBatchTemperatures');
  }

  isDataFresh(reading: TemperatureReading): boolean {
    const maxAgeMinutes = environment.storage.temperatureExpiryMinutes;
    const now = new Date();
    const diffMinutes = (now.getTime() - reading.timestamp.getTime()) / (1000 * 60);
    return diffMinutes < maxAgeMinutes;
  }

  convertTemperature(value: number, fromUnit: 'celsius' | 'fahrenheit', toUnit: 'celsius' | 'fahrenheit'): number {
    if (fromUnit === toUnit) return value;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return (value * 9/5) + 32;
    }
    return (value - 32) * 5/9;
  }

  // --- Internal helpers (will be used in future implementation) ---
  private buildUrl(coords: Coordinates): string {
    const { weatherUnderground } = environment.apiKeys;
    const base = environment.apiEndpoints.weatherUnderground;
    return `${base}/current?key=${weatherUnderground}&lat=${coords.latitude}&lon=${coords.longitude}`;
  }

  private mapApiResponse(raw: any, coordinates: Coordinates): TemperatureReading {
    if (!raw?.current_observation) {
      throw new WeatherDataNotFoundError(coordinates);
    }
    const reading: TemperatureReading = {
      value: raw.current_observation.temp_c,
      unit: 'celsius',
      timestamp: new Date(raw.current_observation.observation_time_rfc822),
      coordinates,
      source: 'Weather Underground'
    };
    const result = validateTemperatureReading(reading);
    if (!result.valid) {
      throw new Error(`Invalid temperature reading mapped: ${result.errors.join(', ')}`);
    }
    return reading;
  }
}
