# API Setup Guide

This application requires API keys from three external services. Follow the setup instructions below.

## Required API Keys

### 1. Google Places API Key

**Purpose**: Address autocomplete and geocoding
**Get your key**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

**Setup Steps**:
1. Create a new project or select existing project
2. Enable "Places API" and "Geocoding API"
3. Create credentials → API Key
4. **Important**: Restrict the key to your domain for security
   - Go to API Key settings
   - Under "Application restrictions" select "HTTP referrers"
   - Add your domain (e.g., `https://yourapp.com/*`, `http://localhost:4200/*` for development)

### 2. OpenRouteService API Key

**Purpose**: Route calculation between addresses
**Get your key**: [OpenRouteService Developer Portal](https://openrouteservice.org/dev/#/signup)

**Setup Steps**:
1. Sign up for free account
2. Go to Dashboard → API Keys
3. Create new API key
4. **Free tier**: 2,000 requests/day, 40 requests/minute

### 3. Weather Underground API Key

**Purpose**: Temperature data at route locations
**Get your key**: [Weather Underground API](https://www.wunderground.com/weather/api/)

**Setup Steps**:
1. Sign up for IBM Weather Company account
2. Subscribe to Weather Underground API
3. **Free tier**: 500 requests/day, 10 requests/minute
4. **Note**: Very limited free tier - consider paid plan for production

## Configuration

### Development
Edit `src/environments/environment.ts`:
```typescript
apiKeys: {
  googlePlaces: 'YOUR_GOOGLE_PLACES_API_KEY',
  openRouteService: 'YOUR_OPENROUTE_SERVICE_API_KEY',
  weatherUnderground: 'YOUR_WEATHER_UNDERGROUND_API_KEY',
},
```

### Production
Edit `src/environments/environment.prod.ts` with production keys.

## Security Best Practices

### Google Places API
- **Always restrict by domain** in Google Cloud Console
- Use different keys for development and production
- Monitor usage in Google Cloud Console

### OpenRouteService
- Monitor daily usage (2,000 request limit)
- Consider upgrading for production traffic

### Weather Underground
- **Limited free tier** (500 requests/day)
- Implement aggressive caching (10-minute TTL)
- Consider paid tier for production
- Monitor usage carefully

## Rate Limiting

The application implements client-side rate limiting:
- Weather: 8 requests/minute (buffer for 10/min API limit)
- Places: 50 requests/second (buffer for 100/sec API limit)
- Routing: 35 requests/minute (buffer for 40/min API limit)

## Alternative APIs (Future Consideration)

If you hit rate limits, consider these alternatives:
- **Weather**: OpenWeatherMap, AccuWeather
- **Geocoding**: MapBox Geocoding, HERE Geocoding
- **Routing**: MapBox Directions, HERE Routing

## Testing Without API Keys

Set `mockApiResponses: true` in environment.ts to use mock data during development.