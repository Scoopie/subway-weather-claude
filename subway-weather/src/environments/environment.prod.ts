export const environment = {
  production: true,

  // API Configuration
  apiKeys: {
    // Google Places API key (browser-restricted)
    // Configure with strict domain restrictions in Google Cloud Console
    googlePlaces: 'YOUR_GOOGLE_PLACES_API_KEY',

    // OpenRouteService API key (free tier: 2000 requests/day)
    openRouteService: 'YOUR_OPENROUTE_SERVICE_API_KEY',

    // Weather Underground API key (free tier: 500 requests/day)
    // Consider upgrading to paid tier for production use
    weatherUnderground: 'YOUR_WEATHER_UNDERGROUND_API_KEY',
  },

  // API Endpoints
  apiEndpoints: {
    googlePlaces: 'https://maps.googleapis.com/maps/api/place',
    googleDirections: 'https://maps.googleapis.com/maps/api/directions',
    openRouteService: 'https://api.openrouteservice.org/v2',
    weatherUnderground: 'https://api.weather.com/v1',
  },

  // Client-side Rate Limiting (more conservative in production)
  rateLimits: {
    weather: {
      requestsPerMinute: 6,        // More conservative for production
      burstLimit: 2,               // Lower burst limit
    },
    places: {
      requestsPerSecond: 30,       // Conservative production limit
      burstLimit: 5,               // Lower burst limit
    },
    routing: {
      requestsPerMinute: 30,       // Conservative production limit
      burstLimit: 3,               // Lower burst limit
    },
  },

  // Storage Configuration
  storage: {
    keyPrefix: 'subway-weather',
    maxRoutes: 10,
    temperatureExpiryMinutes: 10,
    routeExpiryDays: 30,
  },

  // Performance Settings (optimized for production)
  performance: {
    addressInputDebounceMs: 200,     // Faster response in production
    maxRoutePoints: 50,
    temperatureRefreshMinutes: 5,
    geospatialClusteringRadius: 1000,  // meters
  },

  // Production Settings
  debug: {
    enableApiLogging: false,
    enableRateLimitWarnings: false,
    mockApiResponses: false,
  },
};