/**
 * Route Storage Service Contract
 * Handles route persistence in browser storage
 */

export interface Address {
  formattedAddress: string;
  coordinates: Coordinates;
  placeId?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RoutePoint {
  coordinates: Coordinates;
  sequenceIndex: number;
  distanceFromStart: number;
  temperatureReading?: TemperatureReading;
}

export interface TemperatureReading {
  value: number;
  unit: 'celsius' | 'fahrenheit';
  timestamp: Date;
  source: string;
  coordinates: Coordinates;
}

export interface Route {
  id: string;
  startAddress: Address;
  endAddress: Address;
  waypoints: RoutePoint[];
  createdAt: Date;
  lastAccessedAt: Date;
}

export interface UserPreferences {
  temperatureUnit: 'celsius' | 'fahrenheit';
  colorScheme: 'blue-red' | 'cool-warm';
  autoRefreshMinutes: number;
  showLocationNames: boolean;
}

export interface UserSession {
  currentRouteId?: string;
  savedRoutes: string[];
  preferences: UserPreferences;
}

export interface RouteStorageService {
  /**
   * Save a route to storage
   * @param route - Route to save
   * @returns Promise that resolves when saved
   */
  saveRoute(route: Route): Promise<void>;

  /**
   * Load a route by ID
   * @param routeId - Unique route identifier
   * @returns Promise of route or null if not found
   */
  loadRoute(routeId: string): Promise<Route | null>;

  /**
   * Delete a route from storage
   * @param routeId - Route ID to delete
   * @returns Promise that resolves when deleted
   */
  deleteRoute(routeId: string): Promise<void>;

  /**
   * Get all saved route IDs
   * @returns Promise of array of route IDs
   */
  getAllRouteIds(): Promise<string[]>;

  /**
   * Save user session data
   * @param session - Session data to save
   * @returns Promise that resolves when saved
   */
  saveSession(session: UserSession): Promise<void>;

  /**
   * Load user session data
   * @returns Promise of session data or default session
   */
  loadSession(): Promise<UserSession>;

  /**
   * Clean up expired data
   * @returns Promise that resolves when cleanup complete
   */
  cleanupExpiredData(): Promise<void>;

  /**
   * Get storage usage information
   * @returns Promise of storage info (used/available bytes)
   */
  getStorageInfo(): Promise<{ used: number; available: number }>;
}

// Error types
export class StorageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class StorageQuotaExceededError extends StorageError {
  constructor() {
    super('Storage quota exceeded', 'QUOTA_EXCEEDED');
  }
}

export class RouteNotFoundError extends StorageError {
  constructor(routeId: string) {
    super(`Route not found: ${routeId}`, 'ROUTE_NOT_FOUND');
  }
}

export class InvalidRouteDataError extends StorageError {
  constructor(details: string) {
    super(`Invalid route data: ${details}`, 'INVALID_DATA');
  }
}