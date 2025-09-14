import { describe, it, expect } from 'vitest';
import { WeatherService } from '../../services/weather.service';
import { environment } from '../../environments/environment';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection, Injector, runInInjectionContext } from '@angular/core';

// Focused unit tests on pure behaviors (conversion & freshness)

function createService(): WeatherService {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection(), provideHttpClient(), WeatherService]
  });
  const injector = TestBed.inject(Injector);
  let service!: WeatherService;
  runInInjectionContext(injector, () => { service = new WeatherService(); });
  return service;
}

describe('WeatherService Utility Behaviors', () => {
  it('converts Celsius to Fahrenheit accurately', () => {
    const svc = createService();
    expect(svc.convertTemperature(0,'celsius','fahrenheit')).toBe(32);
    expect(svc.convertTemperature(100,'celsius','fahrenheit')).toBe(212);
  });

  it('converts Fahrenheit to Celsius accurately', () => {
    const svc = createService();
    expect(svc.convertTemperature(32,'fahrenheit','celsius')).toBeCloseTo(0, 5);
    expect(svc.convertTemperature(212,'fahrenheit','celsius')).toBeCloseTo(100, 5);
  });

  it('isDataFresh returns true just inside expiry window and false just outside', () => {
    const svc = createService();
    const now = new Date();
    const fresh = { value: 10, unit: 'celsius', timestamp: new Date(now.getTime() - (environment.storage.temperatureExpiryMinutes - 1) * 60000), coordinates: { latitude: 0, longitude: 0 }, source: 'test' } as any;
    const stale = { value: 10, unit: 'celsius', timestamp: new Date(now.getTime() - (environment.storage.temperatureExpiryMinutes + 1) * 60000), coordinates: { latitude: 0, longitude: 0 }, source: 'test' } as any;
    expect(svc.isDataFresh(fresh)).toBe(true);
    expect(svc.isDataFresh(stale)).toBe(false);
  });
});