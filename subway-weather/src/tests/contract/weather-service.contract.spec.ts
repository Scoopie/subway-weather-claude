import { describe, it, expect } from 'vitest';
import { WeatherService } from '../../services/weather.service';
import type { WeatherService as WeatherServiceContract } from '../../../../specs/001-i-want-to/contracts/weather-service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { Injector, runInInjectionContext, provideZonelessChangeDetection } from '@angular/core';

// NOTE: This test intentionally remains RED until WeatherService implementation is provided.

describe('WeatherService Contract', () => {
  it('should implement all required weather methods', () => {
    TestBed.configureTestingModule({
      // Mirror the app's zoneless configuration so Angular doesn't expect Zone.js
      providers: [provideZonelessChangeDetection(), provideHttpClient(), WeatherService]
    });

    const injector = TestBed.inject(Injector);
    let service!: WeatherServiceContract;
    runInInjectionContext(injector, () => {
      service = new WeatherService();
    });

    expect(typeof service.getCurrentTemperature).toBe('function');
    expect(typeof service.getBatchTemperatures).toBe('function');
    expect(typeof service.isDataFresh).toBe('function');
    expect(typeof service.convertTemperature).toBe('function');

    // Placeholder assertion to ensure test stays failing (TDD gate)
    expect(false).toBe(true);
  });
});
