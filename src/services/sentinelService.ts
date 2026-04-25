import { SentinelAlert, SentinelSeverity, SentinelCoordinates } from '@/types/sentinel';

// Helper to determine NOAA severity
function mapNoaaSeverity(severity: string): SentinelSeverity {
  switch (severity?.toLowerCase()) {
    case 'extreme': return 'Extreme';
    case 'severe': return 'Severe';
    case 'moderate': return 'Moderate';
    case 'minor': return 'Minor';
    default: return 'Unknown';
  }
}

// Fetch NOAA Active Weather Alerts
export async function fetchNoaaAlerts(): Promise<SentinelAlert[]> {
  try {
    const res = await fetch('https://api.weather.gov/alerts/active', {
      headers: {
        'User-Agent': 'CommunityManagementApp/1.0 (contact@example.com)',
        'Accept': 'application/geo+json'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!res.ok) {
      console.error('NOAA API returned status:', res.status);
      return [];
    }

    const data = await res.json();
    const alerts: SentinelAlert[] = [];

    if (data.features && Array.isArray(data.features)) {
      for (const feature of data.features) {
        const props = feature.properties;
        let polygon: SentinelCoordinates[] | undefined;

        // Try to parse geometry polygon if present
        if (feature.geometry && feature.geometry.type === 'Polygon') {
           const coords = feature.geometry.coordinates[0]; // array of [lng, lat]
           if (Array.isArray(coords)) {
             polygon = coords.map((c: number[]) => ({ lng: c[0], lat: c[1] }));
           }
        } else if (feature.geometry && feature.geometry.type === 'MultiPolygon') {
            const coords = feature.geometry.coordinates[0][0]; // Take first polygon's outer ring
            if (Array.isArray(coords)) {
                polygon = coords.map((c: number[]) => ({ lng: c[0], lat: c[1] }));
            }
        }

        alerts.push({
          id: props.id,
          source: 'NOAA Weather',
          type: 'WEATHER',
          severity: mapNoaaSeverity(props.severity),
          title: props.event,
          description: props.headline || props.description || 'No description provided.',
          timestamp: props.sent || new Date().toISOString(),
          locationName: props.areaDesc,
          polygon
        });
      }
    }

    return alerts;
  } catch (error) {
    console.error('Error fetching NOAA alerts:', error);
    return [];
  }
}

// Helper to map USGS Magnitude to Severity
function mapUsgsSeverity(mag: number): SentinelSeverity {
  if (mag >= 7.0) return 'Extreme';
  if (mag >= 5.5) return 'Severe';
  if (mag >= 4.0) return 'Moderate';
  if (mag >= 2.5) return 'Minor';
  return 'Unknown';
}

// Fetch USGS Earthquake Data (M2.5+ past day)
export async function fetchUsgsEarthquakes(): Promise<SentinelAlert[]> {
  try {
    const res = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!res.ok) {
      console.error('USGS API returned status:', res.status);
      return [];
    }

    const data = await res.json();
    const alerts: SentinelAlert[] = [];

    if (data.features && Array.isArray(data.features)) {
      for (const feature of data.features) {
        const props = feature.properties;
        const geom = feature.geometry;
        
        let coordinates: SentinelCoordinates | undefined;
        if (geom && geom.type === 'Point') {
          // USGS format is [longitude, latitude, depth]
          coordinates = {
            lng: geom.coordinates[0],
            lat: geom.coordinates[1]
          };
        }

        alerts.push({
          id: feature.id,
          source: 'USGS Earthquakes',
          type: 'SEISMIC',
          severity: mapUsgsSeverity(props.mag),
          title: `M ${props.mag} - ${props.place}`,
          description: `Earthquake of magnitude ${props.mag} occurred at ${new Date(props.time).toLocaleString()}`,
          url: props.url,
          timestamp: new Date(props.time).toISOString(),
          locationName: props.place,
          coordinates
        });
      }
    }

    return alerts;
  } catch (error) {
    console.error('Error fetching USGS earthquakes:', error);
    return [];
  }
}

export async function fetchRedditSocialAlerts(query: string = 'emergency OR crisis OR disaster'): Promise<SentinelAlert[]> {
  try {
    const res = await fetch(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&limit=10`, {
       next: { revalidate: 300 }
    });

    if (!res.ok) {
       console.error('Reddit API returned status:', res.status);
       return [];
    }

    const data = await res.json();
    const alerts: SentinelAlert[] = [];

    if (data.data?.children && Array.isArray(data.data.children)) {
      for (const child of data.data.children) {
        const post = child.data;
        alerts.push({
          id: post.id,
          source: 'Reddit',
          type: 'SOCIAL',
          severity: 'Unknown', // Social severity is hard to gauge automatically
          title: post.title,
          description: post.selftext ? post.selftext.substring(0, 200) + (post.selftext.length > 200 ? '...' : '') : 'No description provided.',
          url: `https://reddit.com${post.permalink}`,
          timestamp: new Date(post.created_utc * 1000).toISOString(),
          locationName: post.subreddit_name_prefixed,
        });
      }
    }

    return alerts;
  } catch (error) {
    console.error('Error fetching Reddit alerts:', error);
    return [];
  }
}

export async function fetchMockSocialAlerts(): Promise<SentinelAlert[]> {
  // Simulated social media hashtags and reports for prototype
  return [
    {
      id: 'mock-1',
      source: 'X / Twitter (Simulated)',
      type: 'SOCIAL',
      severity: 'Moderate',
      title: 'Trending: #FloodWarningDowntown',
      description: 'Multiple users reporting severe flooding near the community center. Water levels rising quickly. Volunteers needed for sandbagging.',
      timestamp: new Date().toISOString(),
      locationName: 'Downtown Area',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 'mock-2',
      source: 'X / Twitter (Simulated)',
      type: 'SOCIAL',
      severity: 'Severe',
      title: 'Trending: #PowerOutageEastSide',
      description: 'Power has been out for 4 hours. Elderly residents might need assistance with heating and medical devices.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      locationName: 'East Side Neighborhood',
      coordinates: { lat: 37.7849, lng: -122.4094 }
    }
  ];
}

export async function getAllSentinelAlerts(): Promise<SentinelAlert[]> {
  const [noaa, usgs, reddit, mock] = await Promise.all([
    fetchNoaaAlerts(),
    fetchUsgsEarthquakes(),
    fetchRedditSocialAlerts(),
    fetchMockSocialAlerts()
  ]);

  // Combine and sort by newest first
  const allAlerts = [...noaa, ...usgs, ...reddit, ...mock];
  allAlerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return allAlerts;
}
