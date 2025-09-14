# Progressive Feature Slices Roadmap

This document reorganizes delivery into thin, demonstrably valuable vertical slices. Each slice aims for:
- User-visible value (UI element or behavior) OR a clearly testable backend capability.
- Fully green tests at slice completion.
- Minimal breadth: implement only what is necessary now.
- Progressive realism: mocks → feature flags → real APIs → optimization.

Status Legend: Pending | In-Progress | Done | Deferred

---
## Slice 0 – Stabilization & Baseline
**Objective**: Remove artificial failing tests; establish a green baseline.
**Scope**:
- Remove/skip placeholder failing specs (geocoding, routing, storage, integration placeholders).
- Keep WeatherService contract test, assert existing methods.
- Add unit tests for `convertTemperature` and `isDataFresh` boundaries.
**Visible Output**: All tests pass (proof of stability).
**Acceptance**:
- `npm test` exits 0 in CI mode.
- No placeholder assertions remain.
**Tests**:
- Unit: WeatherService (conversion, freshness threshold just inside/outside expiry).
- Contract: WeatherService methods exist; unimplemented fetch methods may throw NotImplemented.
**Status**: Pending
**Notes**: Gateway slice. Must finish before any feature slice.

---
## Slice 1 – Hello Weather (Static Display)
**Objective**: Display a single current temperature card with static mocked data.
**Scope**:
- `CurrentTemperatureComponent` added and rendered in `app.html`.
- WeatherService returns hard-coded `TemperatureReading` for `getCurrentTemperature`.
- Basic loading state.
**Visible Output**: Card like: `22°C (as of 12:05 PM)`.
**Acceptance**:
- App loads and shows mock value and timestamp.
- No console errors.
**Tests**:
- Unit: WeatherService mock path returns object.
- Component: DOM contains value + unit.
- Integration: App root includes temperature card.
**Status**: Pending

---
## Slice 2 – Real HTTP Behind Feature Flag
**Objective**: Replace static mock with real (or intercepted) HTTP call guarded by `environment.useMockWeather`.
**Scope**:
- Implement `getCurrentTemperature` real path with HttpClient.
- Map errors: 404 → WeatherDataNotFoundError; >=500 → WeatherApiError (1 retry on 5xx).
- Mappable function extracted: `mapApiResponse` (already drafted) becomes tested unit.
**Visible Output**: Temperature originates from API; console log indicates mock vs real.
**Acceptance**:
- Mock mode still passes tests.
- Real mode passes with HTTP intercepted in tests.
- Proper error message shown for missing data.
**Tests**:
- Unit: mapping & error mapping.
- Contract: WeatherService returns valid `TemperatureReading`.
- Integration: UI updates with fetched value.
- Error case: simulate 404 and show fallback UI text.
**Status**: Pending

---
## Slice 3 – Unit Toggle (°C / °F)
**Objective**: User can toggle temperature unit.
**Scope**:
- Preference signal/service (in-memory initially).
- Toggle button in temperature card.
- Conversion via existing logic.
**Visible Output**: Clicking toggle updates value `22°C` ↔ `71.6°F` (rounded sensibly).
**Acceptance**:
- Default Celsius.
- Toggle persists across component rerender.
**Tests**:
- Unit: conversion edge cases (0°C→32°F, 100°C→212°F, idempotent same-unit).
- Component: DOM updates after toggle.
**Status**: Pending

---
## Slice 4 – Minimal Route Form (Mocked Batch Temps)
**Objective**: Input start/end addresses → show temperatures for start + end only (mocked coordinates & temps).
**Scope**:
- Basic address form (no heavy validation yet).
- Implement `getBatchTemperatures` returning two mocked readings.
- Display list under form.
**Visible Output**: After submit, list of two temps appears.
**Acceptance**:
- Form submission triggers list.
- Loading indicator during fetch.
**Tests**:
- Unit: batch method returns array of length 2.
- Component: form submit leads to rendered list.
- Integration: Simulated user flow.
**Status**: Pending

---
## Slice 5 – Geocoding & Interpolated Points
**Objective**: Derive multiple route points with real (or mock) geocoding + interpolation.
**Scope**:
- Introduce GeocodingService (mock or real behind feature flag).
- Interpolate N intermediate coordinates between start/end.
- Batch temps over these points.
**Visible Output**: >2 temperature entries (e.g., 5 evenly spaced).
**Acceptance**:
- Interpolation count adjustable (config or constant).
- Failure to geocode shows inline error.
**Tests**:
- Unit: interpolation function (start==end edge, rounding).
- Contract: GeocodingService basic method shape.
- Integration: Addresses produce N results.
**Status**: Pending

---
## Slice 6 – Freshness & In-Memory Cache
**Objective**: Cache readings; reuse fresh; show Fresh/Stale badge.
**Scope**:
- Cache keyed by lat,lon with timestamp.
- Display freshness badge logic using `isDataFresh`.
**Visible Output**: Re-submitting same form shortly uses cached values rapidly (badge: Fresh).
**Acceptance**:
- Second call generates fewer HTTP requests (spy verified).
- After expiry threshold, refetch occurs.
**Tests**:
- Unit: cache reuse vs expiry boundary.
- Integration: two sequential submissions assert HTTP call count difference.
**Status**: Pending

---
## Slice 7 – Local Persistence (Preferences + Last Route)
**Objective**: Persist user unit preference & last entered start/end addresses across reload.
**Scope**:
- LocalStorage wrapper with versioning.
- Load on app init; save after successful fetch.
**Visible Output**: Reload preserves form + unit toggle state.
**Acceptance**:
- Pre-seeded storage reflected in UI.
- Updating values overwrites stored state.
**Tests**:
- Unit: storage service set/get/clear.
- Integration: seed then init results in hydrated UI.
**Status**: Pending

---
## Slice 8 – Error & Rate Limit UX
**Objective**: Graceful error surface + simulated rate limit messaging.
**Scope**:
- Central error mapper.
- Handle RateLimitExceededError with cooldown timer disabling fetch button.
**Visible Output**: Friendly alert with countdown or guidance on rate limit.
**Acceptance**:
- Simulated 429 triggers message + disabled button.
- Recovery after timeout.
**Tests**:
- Unit: error mapper classification.
- Integration: simulated rate-limit scenario.
**Status**: Pending

---
## Slice 9 – RoutingService & Distances
**Objective**: Replace simple interpolation with RoutingService path + per-segment temperatures.
**Scope**:
- RoutingService (mock/real) producing ordered coordinate list + distances.
- Display table: segment #, distance, temp.
**Visible Output**: Table showing segments with distances (e.g., Segment 1 – 0.8 km – 21°C).
**Acceptance**:
- Distances > 0 aggregated.
- Temps align 1:1 with path nodes (or segments depending on design choice documented here: nodes-based temps).
**Tests**:
- Unit: distance calculation (Haversine) sample.
- Contract: RoutingService methods defined.
- Integration: route submission yields table with distances.
**Status**: Pending

---
## Slice 10 – Hardening & Coverage
**Objective**: Improve robustness, finalize contract coverage & enforce coverage threshold.
**Scope**:
- Add missing negative/edge tests (invalid coordinates, extreme temperatures, caching eviction scenario).
- Coverage gate (e.g., 85% lines) enforced in Vitest config.
**Visible Output**: None (quality milestone).
**Acceptance**:
- Coverage threshold passes in CI.
- No unhandled promise rejections or console errors during integration tests.
**Tests**:
- Additional unit & contract tests.
**Status**: Pending

---
## Backlog / Deferred Ideas
- MSW-based API mocking for closer-to-real network layer.
- Accessibility audits (Playwright + axe).
- Performance budgets (time to first temperature < X ms in mock mode).
- Offline support (service worker caching of last readings).

---
## Execution Guidelines
1. Finish a slice → green tests → commit with conventional message `feat(slice-x): ...` or `test(slice-x): ...`.
2. Avoid beginning next slice with any red tests unless they define the next slice scope.
3. Document any scope change by editing this file (append a short changelog section if drift appears).

---
## Changelog
- v1 (Initial): Slices 0–10 defined (2025-09-14).

