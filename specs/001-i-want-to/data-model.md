# Data Model: Temperature Route Visualizer

**Date**: 2025-09-13  
**Feature**: Temperature Route Visualizer  
**Branch**: 001-i-want-to

## Core Entities

### Address
Represents user input addresses for route start/end points.

**Fields:**
- `formattedAddress: string` - Full formatted address from geocoding
- `coordinates: Coordinates` - Latitude/longitude pair
- `placeId?: string` - Google Places API identifier for caching

**Validation Rules:**
- `formattedAddress` must be non-empty
- `coordinates` must be valid lat/lng within world bounds (-90 to 90 lat, -180 to 180 lng)

**Relationships:**
- Two Address entities form a Route (start and end)

### Coordinates
Geographic coordinate pair.

**Fields:**
- `latitude: number` - Latitude in decimal degrees
- `longitude: number` - Longitude in decimal degrees

**Validation Rules:**
- `latitude` between -90 and 90
- `longitude` between -180 and 180
- Both must have precision to 6 decimal places

### Route
Represents the calculated path between two addresses.

**Fields:**
- `id: string` - UUID for route identification
- `startAddress: Address` - Origin address
- `endAddress: Address` - Destination address
- `waypoints: RoutePoint[]` - Ordered list of points along route
- `createdAt: Date` - When route was calculated
- `lastAccessedAt: Date` - When route was last viewed

**Validation Rules:**
- `startAddress` and `endAddress` must be different
- `waypoints` must contain at least 2 points (start and end)
- `waypoints` must not exceed 50 points
- `id` must be valid UUID

**Relationships:**
- Contains multiple RoutePoint entities
- References two Address entities

### RoutePoint
Individual point along a route path.

**Fields:**
- `coordinates: Coordinates` - Geographic location
- `sequenceIndex: number` - Order in route (0-based)
- `distanceFromStart: number` - Distance in kilometers from route start
- `temperatureReading?: TemperatureReading` - Associated temperature data

**Validation Rules:**
- `sequenceIndex` must be non-negative and unique within route
- `distanceFromStart` must be non-negative and increase with sequence
- `coordinates` must be valid

**Relationships:**
- Belongs to one Route
- May have one TemperatureReading

### TemperatureReading
Temperature measurement at a specific location and time.

**Fields:**
- `value: number` - Temperature in Celsius
- `unit: 'celsius' | 'fahrenheit'` - Temperature unit
- `timestamp: Date` - When measurement was taken
- `source: string` - Data provider (e.g., "Weather Underground")
- `coordinates: Coordinates` - Exact location of measurement

**Validation Rules:**
- `value` must be between -100 and 100 (reasonable temperature range)
- `timestamp` must not be in the future
- `source` must be non-empty
- Data considered stale after 10 minutes

**Relationships:**
- Associated with RoutePoint
- Standalone entity for caching purposes

### UserSession
Persistent user data stored in browser.

**Fields:**
- `currentRouteId?: string` - ID of currently active route
- `savedRoutes: string[]` - List of saved route IDs
- `preferences: UserPreferences` - Display and behavior settings

**Validation Rules:**
- `savedRoutes` must not exceed 10 routes
- `currentRouteId` must exist in `savedRoutes` if specified

**Relationships:**
- References Route entities by ID
- Contains UserPreferences

### UserPreferences
User configuration for display and behavior.

**Fields:**
- `temperatureUnit: 'celsius' | 'fahrenheit'` - Display temperature unit
- `colorScheme: 'blue-red' | 'cool-warm'` - Route color gradient scheme
- `autoRefreshMinutes: number` - Temperature refresh interval
- `showLocationNames: boolean` - Display location labels on route points

**Validation Rules:**
- `autoRefreshMinutes` must be between 5 and 60
- All fields must have valid enum/boolean/number values

## State Transitions

### Route Lifecycle
```
[User Input] → [Geocoding] → [Route Calculation] → [Temperature Fetching] → [Visualization] → [Persistence]
```

**States:**
1. **Creating** - User entering addresses
2. **Geocoding** - Converting addresses to coordinates  
3. **Routing** - Calculating route waypoints
4. **Loading** - Fetching temperature data
5. **Ready** - Route complete with temperature data
6. **Stale** - Temperature data needs refresh
7. **Error** - Failed at any step

### Temperature Data Lifecycle
```
[Fresh] → [Expired] → [Refetch]
```

**Timing:**
- Fresh: 0-10 minutes old
- Expired: 10+ minutes old (require refetch)

## Data Flow Patterns

### Route Creation Flow
1. User selects start address → Address entity created
2. User selects end address → Address entity created
3. Route calculation triggered → Route entity with waypoints created
4. Temperature data fetched → TemperatureReading entities created
5. Route saved → UserSession updated

### Temperature Refresh Flow
1. Check temperature age for route points
2. Identify expired readings (>10 minutes)
3. Batch API requests for fresh data
4. Update TemperatureReading entities
5. Trigger visualization update

### Session Persistence Flow
1. Route changes → Update UserSession in memory
2. Debounced save to localStorage (1 second delay)
3. On app restart → Load UserSession from localStorage
4. Validate and clean expired route data

## Storage Strategy

### LocalStorage Schema
```typescript
interface StoredData {
  session: UserSession;
  routes: { [routeId: string]: Route };
  temperatureCache: { [key: string]: TemperatureReading };
  lastCleanup: Date;
}
```

### Cache Keys
- Session: `subway-weather:session`
- Routes: `subway-weather:route:{routeId}`
- Temperature: `subway-weather:temp:{lat}:{lng}:{timestamp}`

### Cleanup Strategy
- Remove routes older than 30 days
- Remove temperature data older than 10 minutes
- Limit total storage to 5MB
- Run cleanup on app startup and every 10 minutes

## Validation & Error Handling

### Entity Validation
Each entity includes a `validate()` method that:
- Checks all field constraints
- Returns validation results with specific error messages
- Used before API calls and storage operations

### Error Recovery
- Invalid coordinates → Use approximate coordinates
- Missing temperature → Show route without temperature data
- Stale session → Clear and restart
- Storage quota exceeded → Remove oldest routes first

This data model supports all functional requirements while maintaining data integrity and performance.