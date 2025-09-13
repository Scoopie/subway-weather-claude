export const environment = {
  production: false,

  // API Configuration
  apiKeys: {
    // Google Places API key (browser-restricted)
    // Get from: https://console.cloud.google.com/apis/credentials
    // Configure with domain restrictions for security
    googlePlaces: 'YOUR_GOOGLE_PLACES_API_KEY',

    // OpenRouteService API key (free tier: 2000 requests/day)
    // Get from: https://openrouteservice.org/dev/#/signup
    openRouteService: 'YOUR_OPENROUTE_SERVICE_API_KEY',

    // Weather Underground API key (free tier: 500 requests/day)
    // Get from: https://www.wunderground.com/weather/api/
    // Note: Limited free tier - consider caching strategy
    weatherUnderground: 'YOUR_WEATHER_UNDERGROUND_API_KEY',
  },

  // API Endpoints
  apiEndpoints: {
    googlePlaces: 'https://maps.googleapis.com/maps/api/place',
    googleDirections: 'https://maps.googleapis.com/maps/api/directions',
    openRouteService: 'https://api.openrouteservice.org/v2',
    weatherUnderground: 'https://api.weather.com/v1',
  },

  // Client-side Rate Limiting (respect API limits)
  rateLimits: {
    weather: {
      requestsPerMinute: 8,        // Conservative limit (API: 10/min)
      burstLimit: 3,               // Max concurrent requests
    },
    places: {
      requestsPerSecond: 50,       // Conservative limit (API: 100/sec)
      burstLimit: 10,              // Max concurrent requests
    },
    routing: {
      requestsPerMinute: 35,       // Conservative limit (API: 40/min)
      burstLimit: 5,               // Max concurrent requests
    },
  },

  // Storage Configuration
  storage: {
    keyPrefix: 'subway-weather-dev',
    maxRoutes: 10,
    temperatureExpiryMinutes: 10,
    routeExpiryDays: 30,
  },

  // Performance Settings
  performance: {
    addressInputDebounceMs: 300,
    maxRoutePoints: 50,
    temperatureRefreshMinutes: 5,
    geospatialClusteringRadius: 1000,  // meters
  },

  // Development Settings
  debug: {
    enableApiLogging: true,
    enableRateLimitWarnings: true,
    mockApiResponses: false,
  },
};