# Research: Temperature Route Visualizer

**Date**: 2025-09-13  
**Feature**: Temperature Route Visualizer  
**Branch**: 001-i-want-to

## Research Tasks Completed

### 1. Weather Data Source (Weather Underground API)
**Decision**: Use Weather Underground API for temperature data  
**Rationale**: 
- Comprehensive temperature data with good coverage
- Historical and current data available
- JSON API with good documentation
- Rate limits are reasonable for single-user app

**Alternatives considered**: 
- OpenWeatherMap (limited free tier)
- AccuWeather (complex API structure)
- NOAA (US-only coverage)

### 2. Location/Geocoding Services
**Decision**: Use combination of Google Places API for address autocomplete and Google Directions API for route calculation  
**Rationale**: 
- Google Places provides excellent autocomplete with global coverage
- Google Directions API gives detailed route waypoints
- Well-documented APIs with good rate limits
- Consistent geocoding quality

**Alternatives considered**: 
- MapBox (good but more complex setup)
- OpenStreetMap Nominatim (free but limited autocomplete)
- Bing Maps (less accurate outside US)

### 3. Free API Alternative for Route Calculation
**Decision**: OpenRouteService API as primary recommendation, Google Directions as fallback  
**Rationale**: 
- OpenRouteService offers 2000 requests/day free
- Good route quality with waypoints
- Easy integration with simple REST API
- Backup to Google ensures reliability

**Alternatives considered**: 
- MapBox Directions (500 requests/month free)
- OSRM (self-hosted complexity)
- HERE Routing (complex pricing)

### 4. Angular 20+ with Zoneless and Signals
**Decision**: Angular 20 with experimental zoneless change detection and signals  
**Rationale**: 
- Zoneless provides better performance
- Signals offer reactive programming model
- Latest Angular features for modern development
- Better tree-shaking and bundle size

**Implementation notes**: 
- Use `@angular/core` experimental zoneless provider
- Implement all state management with signals
- Use computed signals for derived state

### 5. Build Tools (Vite + Tailwind + Testing)
**Decision**: Use Vite with Angular, Tailwind CSS, Vitest, and Playwright  
**Rationale**: 
- Vite provides faster builds than webpack
- Tailwind for rapid UI development
- Vitest for fast unit testing
- Playwright for reliable e2e testing

**Setup approach**: 
- Use `@angular-devkit/build-angular:vite` builder
- Configure Tailwind with PostCSS
- Vitest configuration for Angular testing
- Playwright configuration for full app testing

### 6. Visualization Approach
**Decision**: Use HTML5 Canvas with custom drawing for subway-style visualization  
**Rationale**: 
- Full control over subway-style appearance
- Better performance for animated temperature color changes
- Custom marker positioning along paths
- Responsive to different screen sizes

**Alternatives considered**: 
- SVG (DOM overhead for complex routes)
- WebGL (overkill for this use case)
- Existing mapping libraries (don't provide subway aesthetic)

### 7. Session Persistence
**Decision**: Use browser localStorage for route persistence  
**Rationale**: 
- No server required
- Persists across browser sessions
- Simple to implement
- Sufficient storage for route data (~1-5KB per route)

**Data structure**: 
- Store JSON object with start/end addresses, route waypoints, timestamp
- Implement cleanup for old routes (30-day expiry)

## Technical Decisions Summary

| Component | Technology | Justification |
|-----------|------------|---------------|
| Framework | Angular 20+ (zoneless + signals) | Performance + modern reactive patterns |
| Build Tool | Vite | Faster builds, better DX |
| Styling | Tailwind CSS | Rapid development, consistent design |
| Testing | Vitest + Playwright | Fast unit tests + reliable e2e |
| Weather API | Weather Underground | Comprehensive temperature data |
| Geocoding | Google Places API | Best autocomplete experience |
| Routing | OpenRouteService API | Free tier sufficient for MVP |
| Visualization | HTML5 Canvas | Performance + custom subway aesthetic |
| Persistence | LocalStorage | Simple, no server required |

## API Integration Patterns

### Weather Underground Integration
```typescript
interface WeatherResponse {
  current_observation: {
    temp_c: number;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}
```

### Route Calculation Flow
1. User enters addresses → Google Places autocomplete
2. Addresses geocoded → coordinates
3. Route calculated → OpenRouteService waypoints
4. Temperature fetched → Weather Underground for each waypoint
5. Visualization rendered → Canvas with color-coded route

## Performance Considerations
- Debounce address input (300ms)
- Cache temperature data (5-minute TTL)
- Limit route points to 50 maximum
- Lazy load temperature data as user zooms/pans
- Use requestAnimationFrame for smooth animations

## Error Handling Strategy
- Graceful degradation for API failures
- Retry logic with exponential backoff
- User-friendly error messages
- Fallback to cached data when available
- Default route when geocoding fails

All research complete - ready for Phase 1 design.