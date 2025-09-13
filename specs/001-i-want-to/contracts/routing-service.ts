/**
 * Routing Service Contract
 * Handles route calculation between addresses
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RouteWaypoint {
  coordinates: Coordinates;
  sequenceIndex: number;
  distanceFromStart: number; // in kilometers
}

export interface RouteResponse {
  waypoints: RouteWaypoint[];
  totalDistance: number; // in kilometers
  estimatedDuration: number; // in minutes
}

export interface RoutingService {
  /**
   * Calculate route between two addresses
   * @param startCoordinates - Starting point coordinates
   * @param endCoordinates - Destination coordinates
   * @param maxWaypoints - Maximum waypoints to return (default: 50)
   * @returns Promise of route with waypoints
   */
  calculateRoute(
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    maxWaypoints?: number
  ): Promise<RouteResponse>;

  /**
   * Get route waypoints with custom spacing
   * @param startCoordinates - Starting point coordinates
   * @param endCoordinates - Destination coordinates
   * @param spacingKm - Distance between waypoints in kilometers (default: 1)
   * @returns Promise of evenly spaced waypoints
   */
  getEvenlySpacedWaypoints(
    startCoordinates: Coordinates,
    endCoordinates: Coordinates,
    spacingKm?: number
  ): Promise<RouteWaypoint[]>;
}

// Error types
export class RoutingError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'RoutingError';
  }
}

export class NoRouteFoundError extends RoutingError {
  constructor(start: Coordinates, end: Coordinates) {
    super(
      `No route found between ${start.latitude},${start.longitude} and ${end.latitude},${end.longitude}`,
      'NO_ROUTE_FOUND'
    );
  }
}

export class RouteCalculationError extends RoutingError {
  constructor(reason: string) {
    super(`Route calculation failed: ${reason}`, 'CALCULATION_FAILED');
  }
}

export class InvalidRouteParametersError extends RoutingError {
  constructor() {
    super('Invalid route parameters provided', 'INVALID_PARAMETERS');
  }
}