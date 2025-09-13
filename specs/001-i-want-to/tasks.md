# Tasks: Temperature Route Visualizer

**Input**: Design documents from `/specs/001-i-want-to/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory ✓
   → Extract: Angular 20+, Vite, Tailwind, Vitest, Playwright
2. Load optional design documents: ✓
   → data-model.md: 7 entities extracted → model tasks
   → contracts/: 4 files → contract test tasks
   → research.md: API decisions → setup tasks
3. Generate tasks by category: ✓
   → Setup: Angular project, Vite, Tailwind, testing
   → Tests: service contract tests, integration tests
   → Core: models, services, components
   → Integration: API services, storage, visualization
   → Polish: unit tests, performance, e2e tests
4. Apply task rules: ✓
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...) ✓
6. Generate dependency graph ✓
7. Create parallel execution examples ✓
8. Validate task completeness: ✓
   → All contracts have tests ✓
   → All entities have models ✓
   → All user scenarios covered ✓
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Frontend SPA**: `src/` at repository root
- **Tests**: `src/tests/` for unit tests, `e2e/` for Playwright tests

## Phase 3.1: Setup
- [ ] T001 Create Angular 20+ project structure with Vite builder configuration
- [ ] T002 [P] Install and configure Tailwind CSS with PostCSS setup
- [ ] T003 [P] Configure Vitest for unit testing with Angular support
- [ ] T004 [P] Configure Playwright for e2e testing
- [ ] T005 [P] Setup ESLint and Prettier with Angular/TypeScript rules
- [ ] T006 Create environment configuration for API keys (Weather Underground, Google Places, OpenRouteService)
- [ ] T007 [P] Configure zoneless Angular with experimental providers

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T008 [P] Contract test for GeocodingService in src/tests/contract/geocoding-service.contract.spec.ts
- [ ] T009 [P] Contract test for RoutingService in src/tests/contract/routing-service.contract.spec.ts  
- [ ] T010 [P] Contract test for WeatherService in src/tests/contract/weather-service.contract.spec.ts
- [ ] T011 [P] Contract test for RouteStorageService in src/tests/contract/route-storage-service.contract.spec.ts
- [ ] T012 [P] Integration test for route creation flow in src/tests/integration/route-creation.integration.spec.ts
- [ ] T013 [P] Integration test for temperature visualization in src/tests/integration/temperature-visualization.integration.spec.ts
- [ ] T014 [P] Integration test for session persistence in src/tests/integration/session-persistence.integration.spec.ts

## Phase 3.3: Core Models (ONLY after tests are failing)
- [ ] T015 [P] Address model with validation in src/models/address.model.ts
- [ ] T016 [P] Coordinates model with validation in src/models/coordinates.model.ts
- [ ] T017 [P] Route model with validation in src/models/route.model.ts
- [ ] T018 [P] RoutePoint model with validation in src/models/route-point.model.ts
- [ ] T019 [P] TemperatureReading model with validation in src/models/temperature-reading.model.ts
- [ ] T020 [P] UserSession model with validation in src/models/user-session.model.ts
- [ ] T021 [P] UserPreferences model with validation in src/models/user-preferences.model.ts

## Phase 3.4: Core Services
- [ ] T022 [P] GeocodingService implementation with Google Places API integration in src/services/geocoding.service.ts
- [ ] T023 [P] RoutingService implementation with OpenRouteService API in src/services/routing.service.ts
- [ ] T024 [P] WeatherService implementation with Weather Underground API in src/services/weather.service.ts
- [ ] T025 [P] RouteStorageService implementation with localStorage in src/services/route-storage.service.ts
- [ ] T026 RouteManagerService orchestrating route creation flow in src/services/route-manager.service.ts
- [ ] T027 VisualizationService for subway-style canvas rendering in src/services/visualization.service.ts

## Phase 3.5: UI Components
- [ ] T028 [P] AddressInputComponent with autocomplete in src/components/address-input/address-input.component.ts
- [ ] T029 [P] RouteSelectionComponent for start/end input in src/components/route-selection/route-selection.component.ts
- [ ] T030 [P] RouteVisualizationComponent with canvas integration in src/components/route-visualization/route-visualization.component.ts
- [ ] T031 [P] TemperaturePopupComponent for marker details in src/components/temperature-popup/temperature-popup.component.ts
- [ ] T032 [P] LoadingIndicatorComponent for async operations in src/components/loading-indicator/loading-indicator.component.ts
- [ ] T033 [P] ErrorMessageComponent for user feedback in src/components/error-message/error-message.component.ts

## Phase 3.6: Pages & Navigation
- [ ] T034 RouteSelectionPage component in src/pages/route-selection/route-selection.page.ts
- [ ] T035 RouteVisualizationPage component in src/pages/route-visualization/route-visualization.page.ts
- [ ] T036 AppRoutingModule with navigation setup in src/app/app-routing.module.ts
- [ ] T037 AppComponent with navigation logic in src/app/app.component.ts

## Phase 3.7: State Management
- [ ] T038 [P] RouteState service with signals in src/state/route.state.ts
- [ ] T039 [P] TemperatureState service with signals in src/state/temperature.state.ts
- [ ] T040 [P] UIState service with loading/error signals in src/state/ui.state.ts
- [ ] T041 StateManagerService coordinating all state in src/state/state-manager.service.ts

## Phase 3.8: Integration & Polish
- [ ] T042 HTTP interceptor for API error handling in src/interceptors/api-error.interceptor.ts
- [ ] T043 Route guard for navigation protection in src/guards/route.guard.ts
- [ ] T044 Canvas drawing utilities for subway visualization in src/utils/canvas.utils.ts
- [ ] T045 Temperature color mapping utilities in src/utils/temperature-colors.utils.ts
- [ ] T046 Cleanup service for expired data in src/services/cleanup.service.ts

## Phase 3.9: Unit Tests
- [ ] T047 [P] Unit tests for Address model in src/tests/unit/address.model.spec.ts
- [ ] T048 [P] Unit tests for Route model in src/tests/unit/route.model.spec.ts
- [ ] T049 [P] Unit tests for TemperatureReading model in src/tests/unit/temperature-reading.model.spec.ts
- [ ] T050 [P] Unit tests for RouteManagerService in src/tests/unit/route-manager.service.spec.ts
- [ ] T051 [P] Unit tests for VisualizationService in src/tests/unit/visualization.service.spec.ts
- [ ] T052 [P] Unit tests for temperature color utilities in src/tests/unit/temperature-colors.utils.spec.ts

## Phase 3.10: E2E Tests
- [ ] T053 [P] E2E test for complete route creation flow in e2e/route-creation.e2e.spec.ts
- [ ] T054 [P] E2E test for route persistence across sessions in e2e/session-persistence.e2e.spec.ts
- [ ] T055 [P] E2E test for temperature visualization interaction in e2e/temperature-interaction.e2e.spec.ts
- [ ] T056 [P] E2E test for error handling scenarios in e2e/error-handling.e2e.spec.ts

## Phase 3.11: Final Polish
- [ ] T057 Performance optimization for canvas rendering
- [ ] T058 Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] T059 Mobile responsive design validation
- [ ] T060 Bundle size optimization and code splitting
- [ ] T061 Execute quickstart manual testing scenarios
- [ ] T062 API rate limiting and caching optimization

## Dependencies
- Setup (T001-T007) before all other phases
- Tests (T008-T014) before implementation (T015+)
- Models (T015-T021) before Services (T022-T027)
- Services (T022-T027) before Components (T028-T033)
- Components (T028-T033) before Pages (T034-T037)
- State Management (T038-T041) can run parallel with Components
- Integration (T042-T046) after Services and Components
- Unit Tests (T047-T052) after corresponding implementation
- E2E Tests (T053-T056) after full feature implementation
- Final Polish (T057-T062) after all functionality complete

## Parallel Execution Examples

### Phase 3.2 - Contract Tests (run together):
```bash
# Launch all contract tests in parallel
Task: "Contract test for GeocodingService in src/tests/contract/geocoding-service.contract.spec.ts"
Task: "Contract test for RoutingService in src/tests/contract/routing-service.contract.spec.ts"  
Task: "Contract test for WeatherService in src/tests/contract/weather-service.contract.spec.ts"
Task: "Contract test for RouteStorageService in src/tests/contract/route-storage-service.contract.spec.ts"
```

### Phase 3.3 - Models (run together):
```bash
# Launch all model implementations in parallel
Task: "Address model with validation in src/models/address.model.ts"
Task: "Coordinates model with validation in src/models/coordinates.model.ts"
Task: "Route model with validation in src/models/route.model.ts"
Task: "RoutePoint model with validation in src/models/route-point.model.ts"
Task: "TemperatureReading model with validation in src/models/temperature-reading.model.ts"
Task: "UserSession model with validation in src/models/user-session.model.ts"
Task: "UserPreferences model with validation in src/models/user-preferences.model.ts"
```

### Phase 3.4 - Services (run most in parallel):
```bash
# Launch independent service implementations in parallel  
Task: "GeocodingService implementation with Google Places API integration in src/services/geocoding.service.ts"
Task: "RoutingService implementation with OpenRouteService API in src/services/routing.service.ts"
Task: "WeatherService implementation with Weather Underground API in src/services/weather.service.ts"
Task: "RouteStorageService implementation with localStorage in src/services/route-storage.service.ts"
# Note: T026-T027 run sequentially after these complete
```

## Validation Checklist
*GATE: Checked before execution*

- [x] All contracts have corresponding tests (T008-T011)
- [x] All entities have model tasks (T015-T021)
- [x] All tests come before implementation (T008-T014 before T015+)
- [x] Parallel tasks truly independent (different files)
- [x] Each task specifies exact file path
- [x] No task modifies same file as another [P] task
- [x] User journey scenarios covered in integration tests
- [x] Performance targets addressed in final polish
- [x] Cross-browser compatibility testing included

## Notes
- [P] tasks = different files, no dependencies between them
- Verify tests fail before implementing (TDD mandatory)
- Commit after each completed task
- Each contract test must validate the interface completely
- Temperature data expiration (10 minutes) must be tested
- Session persistence across browser restarts must work
- Canvas visualization must support mobile touch interactions