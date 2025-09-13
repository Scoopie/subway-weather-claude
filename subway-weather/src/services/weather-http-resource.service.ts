import { Injectable, inject } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface WeatherResponse {
  current_observation: {
    temp_c: number;
    temp_f: number;
    location: {
      latitude: number;
      longitude: number;
    };
    observation_time_rfc822: string;
  };
}

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

@Injectable({
  providedIn: 'root'
})
export class WeatherHttpResourceService {
  private readonly http = inject(HttpClient);

  /**
   * Creates an HTTP resource for fetching temperature data
   * Using Angular's experimental resource() function for reactive data fetching
   */
  createTemperatureResource(coordinates: Coordinates): ResourceRef<TemperatureReading> {
    return resource({
      request: () => coordinates,
      loader: async ({ request }) => {
        const url = this.buildWeatherUrl(request);

        try {
          const response = await this.http.get<WeatherResponse>(url).toPromise();

          if (!response?.current_observation) {
            throw new Error('Invalid weather data received');
          }

          return this.mapToTemperatureReading(response, request);
        } catch (error) {
          console.error('Weather API error:', error);
          throw new Error(`Failed to fetch weather data: ${error}`);
        }
      },
    });
  }

  /**
   * Creates a batched resource for fetching multiple temperature readings
   * Useful for route waypoints
   */
  createBatchTemperatureResource(coordinatesList: Coordinates[]): ResourceRef<TemperatureReading[]> {
    return resource({
      request: () => coordinatesList,
      loader: async ({ request }) => {
        // Batch requests with rate limiting
        const results: TemperatureReading[] = [];
        const batchSize = environment.rateLimits.weather.burstLimit;

        for (let i = 0; i < request.length; i += batchSize) {
          const batch = request.slice(i, i + batchSize);
          const batchPromises = batch.map(coords =>
            this.fetchSingleTemperature(coords).catch(error => {
              console.warn('Failed to fetch temperature for coordinates:', coords, error);
              return this.createFallbackReading(coords);
            })
          );

          const batchResults = await Promise.all(batchPromises);
          results.push(...batchResults);

          // Add delay between batches to respect rate limits
          if (i + batchSize < request.length) {
            await this.delay(60000 / environment.rateLimits.weather.requestsPerMinute);
          }
        }

        return results;
      },
    });
  }

  /**
   * Check if cached temperature data is still fresh (within 10 minutes)
   */
  isDataFresh(reading: TemperatureReading): boolean {
    const now = new Date();
    const readingTime = new Date(reading.timestamp);
    const diffMinutes = (now.getTime() - readingTime.getTime()) / (1000 * 60);
    return diffMinutes < environment.storage.temperatureExpiryMinutes;
  }

  private buildWeatherUrl(coordinates: Coordinates): string {
    const { weatherUnderground } = environment.apiKeys;
    const baseUrl = environment.apiEndpoints.weatherUnderground;

    return `${baseUrl}/current?key=${weatherUnderground}&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  }

  private async fetchSingleTemperature(coordinates: Coordinates): Promise<TemperatureReading> {
    const url = this.buildWeatherUrl(coordinates);
    const response = await this.http.get<WeatherResponse>(url).toPromise();

    if (!response?.current_observation) {
      throw new Error('Invalid weather data received');
    }

    return this.mapToTemperatureReading(response, coordinates);
  }

  private mapToTemperatureReading(response: WeatherResponse, coordinates: Coordinates): TemperatureReading {
    return {
      value: response.current_observation.temp_c,
      unit: 'celsius',
      timestamp: new Date(response.current_observation.observation_time_rfc822),
      coordinates,
      source: 'Weather Underground',
    };
  }

  private createFallbackReading(coordinates: Coordinates): TemperatureReading {
    return {
      value: 20, // Default temperature
      unit: 'celsius',
      timestamp: new Date(),
      coordinates,
      source: 'Fallback (API unavailable)',
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Convert temperature between units
   */
  convertTemperature(value: number, fromUnit: 'celsius' | 'fahrenheit', toUnit: 'celsius' | 'fahrenheit'): number {
    if (fromUnit === toUnit) return value;

    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      return (value * 9/5) + 32;
    } else {
      return (value - 32) * 5/9;
    }
  }
}