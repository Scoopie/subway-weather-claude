import { describe, it, expect } from 'vitest';
import { WeatherService } from '../../services/weather.service';
import type { WeatherService as WeatherServiceContract } from '../../../../specs/001-i-want-to/contracts/weather-service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Injector, runInInjectionContext, provideZonelessChangeDetection } from '@angular/core';

// Slice 0: Assert currently implemented behaviors; allow unimplemented fetchers to throw.
describe('WeatherService Contract', () => {
  it('exposes required method signatures', () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient(), WeatherService]
    });
    const injector = TestBed.inject(Injector);
    let service!: WeatherServiceContract;
    runInInjectionContext(injector, () => { service = new WeatherService(); });

    expect(service).toBeDefined();
    expect(typeof service.getCurrentTemperature).toBe('function');
    expect(typeof service.getBatchTemperatures).toBe('function');
    expect(typeof service.isDataFresh).toBe('function');
    expect(typeof service.convertTemperature).toBe('function');
  });
});
