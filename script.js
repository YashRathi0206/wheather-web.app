// API Configuration
const API_KEY = '683e288d8c48eaecd136e2ca4eeb0992';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0';
const AQI_BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

// City Suggestions
const CITY_SUGGESTIONS = {
    international: [
        // North America
        'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver',
        'San Francisco', 'Miami', 'Houston', 'Boston', 'Seattle',
        'Montreal', 'Washington DC', 'Las Vegas', 'Dallas', 'Denver',
        
        // Europe
        'London', 'Paris', 'Berlin', 'Rome', 'Barcelona',
        'Amsterdam', 'Madrid', 'Vienna', 'Prague', 'Budapest',
        'Dublin', 'Athens', 'Lisbon', 'Stockholm', 'Copenhagen',
        'Brussels', 'Warsaw', 'Munich', 'Venice', 'Edinburgh',
        
        // Asia
        'Tokyo', 'Singapore', 'Seoul', 'Hong Kong', 'Bangkok',
        'Shanghai', 'Beijing', 'Dubai', 'Kuala Lumpur', 'Taipei',
        'Manila', 'Jakarta', 'Mumbai', 'Delhi', 'Osaka',
        
        // Oceania
        'Sydney', 'Melbourne', 'Auckland', 'Brisbane', 'Perth',
        'Adelaide', 'Wellington', 'Gold Coast', 'Christchurch',
        
        // South America
        'Rio de Janeiro', 'São Paulo', 'Buenos Aires', 'Santiago',
        'Lima', 'Bogotá', 'Caracas', 'Montevideo', 'Quito',
        
        // Africa
        'Cape Town', 'Johannesburg', 'Cairo', 'Nairobi', 'Casablanca',
        'Lagos', 'Accra', 'Addis Ababa', 'Tunis', 'Dakar',
        
        // Middle East
        'Dubai', 'Abu Dhabi', 'Doha', 'Tel Aviv', 'Istanbul',
        'Riyadh', 'Jerusalem', 'Beirut', 'Amman', 'Kuwait City'
    ],
    indian: [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
        'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
        'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
        'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana'
    ]
};

// Spotify Playlist IDs for different weather conditions
const SPOTIFY_PLAYLISTS = {
    'Clear': '37i9dQZF1DXdPec7aLTmlC', // Uplifting Pop
    'Rain': '37i9dQZF1DX3Ogo9pFvBkY', // Chill Lo-fi
    'Snow': '37i9dQZF1DX4WYpdgoIcn6', // Warm Acoustic
    'Clouds': '37i9dQZF1DXcBWIGoYBM5M', // Indie Vibes
    'Thunderstorm': '37i9dQZF1DX3YSRoSdA634', // Dark Beats
};

// DOM Elements
const weatherPanel = document.getElementById('weatherPanel');
const currentWeather = document.getElementById('currentWeather');
const tempVisualization = document.getElementById('tempVisualization');
const conditionsVisualization = document.getElementById('conditionsVisualization');
const forecast = document.getElementById('forecast');
const aqiDisplay = document.getElementById('aqiDisplay');
const alertsDisplay = document.getElementById('alertsDisplay');
const loadingOverlay = document.getElementById('loadingOverlay');
const citySearch = document.getElementById('citySearch');
const searchBtn = document.getElementById('searchBtn');
const themeToggle = document.getElementById('themeToggle');
const unitToggle = document.getElementById('unitToggle');
const spotifyPlayer = document.getElementById('spotify-embed');
const favoritesList = document.getElementById('favoritesList');
const citySuggestions = document.getElementById('citySuggestions');
const globeViz = document.getElementById('globeViz');

// Create suggestions container
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'absolute w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-1 z-50 hidden';
citySearch.parentElement.appendChild(suggestionsContainer);

// Enhanced list of international cities
const CITIES = [
    // North America
    { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA' },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'USA' },
    { name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'Canada' },
    { name: 'Mexico City', lat: 19.4326, lng: -99.1332, country: 'Mexico' },
    { name: 'Vancouver', lat: 49.2827, lng: -123.1207, country: 'Canada' },
    
    // Europe
    { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
    { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France' },
    { name: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany' },
    { name: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy' },
    { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, country: 'Netherlands' },
    { name: 'Madrid', lat: 40.4168, lng: -3.7038, country: 'Spain' },
    { name: 'Vienna', lat: 48.2082, lng: 16.3738, country: 'Austria' },
    { name: 'Stockholm', lat: 59.3293, lng: 18.0686, country: 'Sweden' },
    
    // Asia
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore' },
    { name: 'Seoul', lat: 37.5665, lng: 126.9780, country: 'South Korea' },
    { name: 'Bangkok', lat: 13.7563, lng: 100.5018, country: 'Thailand' },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'UAE' },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India' },
    { name: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'China' },
    { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, country: 'China' },
    
    // Oceania
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia' },
    { name: 'Melbourne', lat: -37.8136, lng: 144.9631, country: 'Australia' },
    { name: 'Auckland', lat: -36.8509, lng: 174.7645, country: 'New Zealand' },
    { name: 'Brisbane', lat: -27.4698, lng: 153.0251, country: 'Australia' },
    
    // South America
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil' },
    { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816, country: 'Argentina' },
    { name: 'Santiago', lat: -33.4489, lng: -70.6693, country: 'Chile' },
    { name: 'Lima', lat: -12.0464, lng: -77.0428, country: 'Peru' },
    
    // Africa
    { name: 'Cape Town', lat: -33.9249, lng: 18.4241, country: 'South Africa' },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357, country: 'Egypt' },
    { name: 'Nairobi', lat: -1.2921, lng: 36.8219, country: 'Kenya' },
    { name: 'Lagos', lat: 6.5244, lng: 3.3792, country: 'Nigeria' },
    
    // Middle East
    { name: 'Istanbul', lat: 41.0082, lng: 28.9784, country: 'Turkey' },
    { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818, country: 'Israel' },
    { name: 'Doha', lat: 25.2854, lng: 51.5310, country: 'Qatar' }
];

// State
let isCelsius = true;
let currentCity = null;
let searchTimeout;
let globe;

// Initialize globe with enhanced city data
function initGlobe() {
    const globeViz = document.getElementById('globeViz');
    if (!globeViz) {
        console.error('Globe visualization element not found');
        return;
    }

    // Get the container width
    const containerWidth = globeViz.clientWidth || window.innerWidth;

    try {
        // Create globe instance with proper HTTPS URLs
        globe = Globe()
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
            .pointAltitude(0.1)
            .pointColor(() => '#ff0000')
            .pointRadius(0.5)
            .pointsData([]) // Start with empty points data
            .pointLabel(d => `${d.name}`)
            .width(containerWidth)
            .height(500)
            (globeViz);

        // Remove any existing arcs or lines
        if (globe.arcsData) {
            globe.arcsData([]);
        }
        if (globe.pathsData) {
            globe.pathsData([]);
        }
        if (globe.linesData) {
            globe.linesData([]);
        }

        // Add auto-rotation
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;

        // Store globe instance
        window.globe = globe;

        // Handle window resize
        window.addEventListener('resize', () => {
            if (globe) {
                const newWidth = globeViz.clientWidth || window.innerWidth;
                globe.width(newWidth);
            }
        });

    } catch (error) {
        console.error('Error initializing globe:', error);
        // Create a simple fallback globe if initialization fails
        try {
            globe = Globe()
                .globeImageUrl(null)
                .bumpImageUrl(null)
                .backgroundImageUrl(null)
                .globeMaterial(new THREE.MeshPhongMaterial({ color: '#1a1a1a' }))
                .width(containerWidth)
                .height(500)
                (globeViz);

            // Remove any existing arcs or lines in fallback
            if (globe.arcsData) {
                globe.arcsData([]);
            }
            if (globe.pathsData) {
                globe.pathsData([]);
            }
            if (globe.linesData) {
                globe.linesData([]);
            }

            // Add auto-rotation to fallback globe
            globe.controls().autoRotate = true;
            globe.controls().autoRotateSpeed = 0.5;

            // Store fallback globe instance
            window.globe = globe;

            // Handle window resize for fallback globe
            window.addEventListener('resize', () => {
                if (globe) {
                    const newWidth = globeViz.clientWidth || window.innerWidth;
                    globe.width(newWidth);
                }
            });
        } catch (fallbackError) {
            console.error('Fallback globe initialization failed:', fallbackError);
        }
    }
}

// Enhanced city search with suggestions
citySearch.addEventListener('input', async (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    // Clear previous timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Clear suggestions if query is empty
    if (!query) {
        citySuggestions.innerHTML = '';
        return;
    }
    
    // Set a timeout to prevent too many API calls
    searchTimeout = setTimeout(async () => {
        try {
            // First, filter local cities
            const localMatches = CITIES.filter(city => 
                city.name.toLowerCase().includes(query) || 
                city.country.toLowerCase().includes(query)
            ).slice(0, 5);

            // Then, fetch from API for more suggestions
            const response = await fetch(`${GEO_BASE_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
            if (!response.ok) throw new Error('Failed to fetch suggestions');
            
            const apiMatches = await response.json();
            
            // Combine and deduplicate results
            const allMatches = [...localMatches];
            apiMatches.forEach(city => {
                if (!allMatches.some(match => 
                    match.name.toLowerCase() === city.name.toLowerCase() && 
                    match.country.toLowerCase() === city.country.toLowerCase()
                )) {
                    allMatches.push({
                        name: city.name,
                        country: city.country,
                        lat: city.lat,
                        lng: city.lon
                    });
                }
            });

            // Update suggestions
            citySuggestions.innerHTML = allMatches
                .slice(0, 10)
                .map(city => `<option value="${city.name}, ${city.country}">`)
                .join('');
        } catch (error) {
            console.error('Error fetching city suggestions:', error);
        }
    }, 300); // 300ms delay
});

// Update city suggestions as user types
citySearch.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length < 2) {
        citySuggestions.innerHTML = '';
        return;
    }

    // Clear previous timeout
    clearTimeout(searchTimeout);

    // Set new timeout for debouncing
    searchTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`${GEO_BASE_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
            if (!response.ok) throw new Error('Failed to fetch suggestions');
            
            const data = await response.json();
            
            // Clear previous suggestions
            citySuggestions.innerHTML = '';
            
            // Add new suggestions
            data.forEach(city => {
                const option = document.createElement('option');
                option.value = `${city.name}, ${city.country}`;
                citySuggestions.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, 300); // 300ms debounce
});

// Utility Functions
function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

function getTimeUntil(timestamp) {
    const now = Date.now();
    const target = timestamp * 1000;
    const diff = target - now;
    
    if (diff <= 0) return 'Now';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

// Initialize dark mode
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.documentElement.classList.add('dark');
    }
}

// Toggle dark mode
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    
    // Update globe appearance
    globe.globeImageUrl(isDark ? 
        'https://unpkg.com/three-globe/example/img/earth-dark.jpg' :
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
    );
    // Update background color based on theme
    globe.backgroundColor(isDark ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)');
}

// Fetch weather data with improved error handling
async function fetchWeatherData(lat, lon) {
    try {
        showLoading();
        
        // Fetch current weather and forecast in parallel
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(`${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
            fetch(`${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const [currentData, forecastData] = await Promise.all([
            currentResponse.json(),
            forecastResponse.json()
        ]);

        // Process forecast data to get daily forecasts
        const dailyForecasts = [];
        const today = new Date().setHours(0, 0, 0, 0);
        
        forecastData.list.forEach(item => {
            const itemDate = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
            if (itemDate > today) {
                const existingDay = dailyForecasts.find(d => 
                    new Date(d.dt * 1000).setHours(0, 0, 0, 0) === itemDate
                );
                if (!existingDay) {
                    dailyForecasts.push({
                        dt: item.dt,
                        temp: {
                            min: item.main.temp_min,
                            max: item.main.temp_max
                        },
                        weather: item.weather
                    });
                }
            }
        });

        // Process and validate the data
        const processedData = {
            current: {
                temp: currentData.main.temp,
                feels_like: currentData.main.feels_like,
                humidity: currentData.main.humidity,
                wind_speed: currentData.wind.speed,
                pressure: currentData.main.pressure,
                weather: currentData.weather || [{ main: 'Unknown', description: 'No weather data available' }],
                sunrise: currentData.sys.sunrise,
                sunset: currentData.sys.sunset
            },
            hourly: forecastData.list.slice(0, 24).map(hour => ({
                dt: hour.dt,
                temp: hour.main.temp,
                weather: hour.weather || [{ main: 'Unknown', description: 'No weather data available' }]
            })),
            daily: dailyForecasts.slice(0, 5)
        };

        return processedData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error(error.message || 'Failed to fetch weather data. Please try again.');
    } finally {
        hideLoading();
    }
}

// Fetch AQI data with improved error handling
async function fetchAQIData(lat, lon) {
    try {
        const response = await fetch(`${AQI_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch AQI data');
        }

        const data = await response.json();
        
        if (!data || !data.list || data.list.length === 0) {
            throw new Error('Invalid AQI data received');
        }

        return data;
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        throw new Error(error.message || 'Failed to fetch air quality data. Please try again.');
    }
}

// Check for required elements
function checkRequiredElements() {
    const requiredElements = {
        'currentWeather': document.getElementById('currentWeather'),
        'tempVisualization': document.getElementById('tempVisualization'),
        'conditionsVisualization': document.getElementById('conditionsVisualization'),
        'forecast': document.getElementById('forecast'),
        'aqiDisplay': document.getElementById('aqiDisplay'),
        'alertsDisplay': document.getElementById('alertsDisplay'),
        'loadingOverlay': document.getElementById('loadingOverlay'),
        'citySearch': document.getElementById('citySearch'),
        'searchBtn': document.getElementById('searchBtn'),
        'themeToggle': document.getElementById('themeToggle'),
        'unitToggle': document.getElementById('unitToggle'),
        'spotifyPlayer': document.getElementById('spotify-embed'),
        'favoritesList': document.getElementById('favoritesList'),
        'citySuggestions': document.getElementById('citySuggestions'),
        'globeViz': document.getElementById('globeViz')
    };

    // Check if all elements exist
    const missingElements = Object.entries(requiredElements)
        .filter(([_, element]) => !element)
        .map(([name]) => name);

    if (missingElements.length > 0) {
        console.error('Missing required elements:', missingElements);
        return false;
    }

    return true;
}

// Add temperature conversion function
function convertTemp(temp, toFahrenheit) {
    if (toFahrenheit) {
        return (temp * 9/5) + 32;
    } else {
        return (temp - 32) * 5/9;
    }
}

// Update current weather display with better error handling
function updateCurrentWeather(data) {
    if (!currentWeather) {
        console.error('Current weather element not found');
        return;
    }

    try {
        if (!data || !data.current) {
            throw new Error('No current weather data available');
        }

        const current = data.current;
        const weather = current.weather[0];
        
        // Convert temperatures if needed
        const displayTemp = isCelsius ? current.temp : convertTemp(current.temp, true);
        const displayFeelsLike = isCelsius ? current.feels_like : convertTemp(current.feels_like, true);
        
        currentWeather.innerHTML = `
            <div class="flex flex-col md:flex-row items-center justify-between">
                <div class="text-center md:text-left mb-4 md:mb-0">
                    <h2 class="text-4xl font-bold text-gray-800 dark:text-white mb-2">${currentCity}</h2>
                    <p class="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">${Math.round(displayTemp)}°${isCelsius ? 'C' : 'F'}</p>
                    <p class="text-xl text-gray-600 dark:text-gray-300">${weather.description}</p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                        <i class="fas fa-wind text-blue-500 dark:text-blue-400 text-2xl mb-2"></i>
                        <p class="text-gray-600 dark:text-gray-300">Wind</p>
                        <p class="text-lg font-semibold text-gray-800 dark:text-white">${current.wind_speed} m/s</p>
                    </div>
                    <div class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                        <i class="fas fa-tint text-blue-500 dark:text-blue-400 text-2xl mb-2"></i>
                        <p class="text-gray-600 dark:text-gray-300">Humidity</p>
                        <p class="text-lg font-semibold text-gray-800 dark:text-white">${current.humidity}%</p>
                    </div>
                    <div class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                        <i class="fas fa-compress-alt text-blue-500 dark:text-blue-400 text-2xl mb-2"></i>
                        <p class="text-gray-600 dark:text-gray-300">Pressure</p>
                        <p class="text-lg font-semibold text-gray-800 dark:text-white">${current.pressure} hPa</p>
                    </div>
                    <div class="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                        <i class="fas fa-temperature-high text-blue-500 dark:text-blue-400 text-2xl mb-2"></i>
                        <p class="text-gray-600 dark:text-gray-300">Feels Like</p>
                        <p class="text-lg font-semibold text-gray-800 dark:text-white">${Math.round(displayFeelsLike)}°${isCelsius ? 'C' : 'F'}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error updating current weather:', error);
        currentWeather.innerHTML = `
            <div class="text-center p-4">
                <p class="text-red-500 dark:text-red-400">Unable to display weather information. Please try again.</p>
            </div>
        `;
    }
}

// Update hourly forecast with better error handling
function updateHourlyForecast(data) {
    if (!tempVisualization) {
        console.error('Temperature visualization element not found');
        return;
    }

    try {
        if (!data || !data.hourly || data.hourly.length === 0) {
            throw new Error('No hourly forecast data available');
        }

        const hourlyContainer = document.createElement('div');
        hourlyContainer.className = 'flex overflow-x-auto space-x-4 pb-4';
        
        data.hourly.slice(0, 24).forEach(hour => {
            const displayTemp = isCelsius ? hour.temp : convertTemp(hour.temp, true);
            const hourCard = document.createElement('div');
            hourCard.className = 'flex-shrink-0 w-24 bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg';
            
            const date = new Date(hour.dt * 1000);
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            hourCard.innerHTML = `
                <p class="text-gray-600 dark:text-gray-300 mb-2">${time}</p>
                <p class="text-2xl font-bold text-gray-800 dark:text-white mb-2">${Math.round(displayTemp)}°${isCelsius ? 'C' : 'F'}</p>
                <p class="text-gray-600 dark:text-gray-300">${hour.weather[0].description}</p>
            `;
            
            hourlyContainer.appendChild(hourCard);
        });
        
        tempVisualization.innerHTML = '';
        tempVisualization.appendChild(hourlyContainer);
    } catch (error) {
        console.error('Error updating hourly forecast:', error);
        tempVisualization.innerHTML = `
            <div class="text-center p-4">
                <p class="text-red-500 dark:text-red-400">Unable to display hourly forecast. Please try again.</p>
            </div>
        `;
    }
}

// Update daily forecast with better error handling
function updateDailyForecast(data) {
    const forecastContainer = document.querySelector('#forecast .flex');
    if (!forecastContainer) {
        console.error('Forecast container not found');
        return;
    }

    try {
        if (!data || !data.daily || data.daily.length === 0) {
            throw new Error('No daily forecast data available');
        }

        forecastContainer.innerHTML = '';
        
        data.daily.slice(0, 5).forEach(day => {
            const displayTemp = isCelsius ? day.temp.max : convertTemp(day.temp.max, true);
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString([], { weekday: 'short' });
            
            const dayCard = document.createElement('div');
            dayCard.className = 'flex-shrink-0 w-32 bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg';
            
            dayCard.innerHTML = `
                <p class="text-gray-600 dark:text-gray-300 mb-2">${dayName}</p>
                <p class="text-2xl font-bold text-gray-800 dark:text-white mb-2">${Math.round(displayTemp)}°${isCelsius ? 'C' : 'F'}</p>
                <p class="text-gray-600 dark:text-gray-300">${day.weather[0].description}</p>
            `;
            
            forecastContainer.appendChild(dayCard);
        });
    } catch (error) {
        console.error('Error updating daily forecast:', error);
        forecastContainer.innerHTML = `
            <div class="text-center p-4 w-full">
                <p class="text-red-500 dark:text-red-400">Unable to display daily forecast. Please try again.</p>
            </div>
        `;
    }
}

// Helper function to calculate PM2.5 AQI
function calculatePM25AQI(pm25) {
    // US EPA PM2.5 breakpoints (μg/m³)
    if (pm25 <= 12.0) return Math.round((pm25 / 12.0) * 50);
    if (pm25 <= 35.4) return Math.round(50 + ((pm25 - 12.1) / 23.3) * 50);
    if (pm25 <= 55.4) return Math.round(100 + ((pm25 - 35.5) / 19.9) * 50);
    if (pm25 <= 150.4) return Math.round(150 + ((pm25 - 55.5) / 94.9) * 50);
    if (pm25 <= 250.4) return Math.round(200 + ((pm25 - 150.5) / 99.9) * 50);
    if (pm25 <= 350.4) return Math.round(300 + ((pm25 - 250.5) / 99.9) * 100);
    if (pm25 <= 500.4) return Math.round(400 + ((pm25 - 350.5) / 149.9) * 100);
    return 500;
}

// Helper function to calculate PM10 AQI
function calculatePM10AQI(pm10) {
    // US EPA PM10 breakpoints (μg/m³)
    if (pm10 <= 54) return Math.round((pm10 / 54) * 50);
    if (pm10 <= 154) return Math.round(50 + ((pm10 - 55) / 99) * 50);
    if (pm10 <= 254) return Math.round(100 + ((pm10 - 155) / 99) * 50);
    if (pm10 <= 354) return Math.round(150 + ((pm10 - 255) / 99) * 50);
    if (pm10 <= 424) return Math.round(200 + ((pm10 - 355) / 69) * 50);
    if (pm10 <= 504) return Math.round(300 + ((pm10 - 425) / 79) * 100);
    if (pm10 <= 604) return Math.round(400 + ((pm10 - 505) / 99) * 100);
    return 500;
}

// Helper function to calculate O3 AQI (8-hour average)
function calculateO3AQI(o3) {
    // US EPA O3 breakpoints (ppb)
    if (o3 <= 54) return Math.round((o3 / 54) * 50);
    if (o3 <= 70) return Math.round(50 + ((o3 - 55) / 15) * 50);
    if (o3 <= 85) return Math.round(100 + ((o3 - 71) / 14) * 50);
    if (o3 <= 105) return Math.round(150 + ((o3 - 86) / 19) * 50);
    if (o3 <= 200) return Math.round(200 + ((o3 - 106) / 94) * 100);
    return 300;
}

// Helper function to calculate NO2 AQI (1-hour average)
function calculateNO2AQI(no2) {
    // US EPA NO2 breakpoints (ppb)
    if (no2 <= 53) return Math.round((no2 / 53) * 50);
    if (no2 <= 100) return Math.round(50 + ((no2 - 54) / 46) * 50);
    if (no2 <= 360) return Math.round(100 + ((no2 - 101) / 259) * 50);
    if (no2 <= 649) return Math.round(150 + ((no2 - 361) / 288) * 50);
    if (no2 <= 1249) return Math.round(200 + ((no2 - 650) / 599) * 100);
    if (no2 <= 1649) return Math.round(300 + ((no2 - 1250) / 399) * 100);
    if (no2 <= 2049) return Math.round(400 + ((no2 - 1650) / 399) * 100);
    return 500;
}

// Helper function to calculate SO2 AQI (1-hour average)
function calculateSO2AQI(so2) {
    // US EPA SO2 breakpoints (ppb)
    if (so2 <= 35) return Math.round((so2 / 35) * 50);
    if (so2 <= 75) return Math.round(50 + ((so2 - 36) / 39) * 50);
    if (so2 <= 185) return Math.round(100 + ((so2 - 76) / 109) * 50);
    if (so2 <= 304) return Math.round(150 + ((so2 - 186) / 118) * 50);
    if (so2 <= 604) return Math.round(200 + ((so2 - 305) / 299) * 100);
    if (so2 <= 804) return Math.round(300 + ((so2 - 605) / 199) * 100);
    if (so2 <= 1004) return Math.round(400 + ((so2 - 805) / 199) * 100);
    return 500;
}

// Helper function to calculate CO AQI (8-hour average)
function calculateCOAQI(co) {
    // US EPA CO breakpoints (ppm)
    if (co <= 4.4) return Math.round((co / 4.4) * 50);
    if (co <= 9.4) return Math.round(50 + ((co - 4.5) / 4.9) * 50);
    if (co <= 12.4) return Math.round(100 + ((co - 9.5) / 2.9) * 50);
    if (co <= 15.4) return Math.round(150 + ((co - 12.5) / 2.9) * 50);
    if (co <= 30.4) return Math.round(200 + ((co - 15.5) / 14.9) * 100);
    if (co <= 40.4) return Math.round(300 + ((co - 30.5) / 9.9) * 100);
    if (co <= 50.4) return Math.round(400 + ((co - 40.5) / 9.9) * 100);
    return 500;
}

// Helper function to get AQI category and color
function getAQICategory(aqi) {
    if (aqi <= 50) {
        return {
            category: 'Good',
            color: 'text-green-500',
            description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
        };
    }
    if (aqi <= 100) {
        return {
            category: 'Moderate',
            color: 'text-yellow-500',
            description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
        };
    }
    if (aqi <= 150) {
        return {
            category: 'Unhealthy for Sensitive Groups',
            color: 'text-orange-500',
            description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
        };
    }
    if (aqi <= 200) {
        return {
            category: 'Unhealthy',
            color: 'text-red-500',
            description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.'
        };
    }
    if (aqi <= 300) {
        return {
            category: 'Very Unhealthy',
            color: 'text-purple-500',
            description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.'
        };
    }
    return {
        category: 'Hazardous',
        color: 'text-red-800',
        description: 'Health alert: everyone may experience more serious health effects.'
    };
}

// Update AQI display with accurate values
function updateAQIDisplay(data) {
    if (!aqiDisplay) {
        console.error('AQI display element not found');
        return;
    }

    try {
        if (!data || !data.list || data.list.length === 0) {
            throw new Error('No AQI data available');
        }

        const aqiData = data.list[0];
        const components = aqiData.components;
        
        // Convert units if needed (OpenWeatherMap provides μg/m³)
        const pm25 = components.pm2_5;
        const pm10 = components.pm10;
        const o3 = components.o3; // Already in μg/m³
        const no2 = components.no2; // Already in μg/m³
        const so2 = components.so2; // Already in μg/m³
        const co = components.co / 1000; // Convert μg/m³ to ppm for CO
        
        // Calculate individual pollutant AQIs
        const pm25AQI = calculatePM25AQI(pm25);
        const pm10AQI = calculatePM10AQI(pm10);
        const o3AQI = calculateO3AQI(o3);
        const no2AQI = calculateNO2AQI(no2);
        const so2AQI = calculateSO2AQI(so2);
        const coAQI = calculateCOAQI(co);
        
        // Get the highest AQI value
        const actualAQI = Math.max(pm25AQI, pm10AQI, o3AQI, no2AQI, so2AQI, coAQI);
        
        // Get AQI category and color
        const aqiInfo = getAQICategory(actualAQI);
        
        aqiDisplay.innerHTML = `
            <div class="flex flex-col items-center">
                <div class="text-4xl font-bold mb-2 ${aqiInfo.color}">${actualAQI}</div>
                <div class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${aqiInfo.category}</div>
                <div class="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center max-w-md">${aqiInfo.description}</div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">PM2.5</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${pm25.toFixed(1)} μg/m³</p>
                        <p class="text-xs ${getAQICategory(pm25AQI).color}">AQI: ${pm25AQI}</p>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">PM10</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${pm10.toFixed(1)} μg/m³</p>
                        <p class="text-xs ${getAQICategory(pm10AQI).color}">AQI: ${pm10AQI}</p>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">O₃</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${o3.toFixed(1)} μg/m³</p>
                        <p class="text-xs ${getAQICategory(o3AQI).color}">AQI: ${o3AQI}</p>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">NO₂</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${no2.toFixed(1)} μg/m³</p>
                        <p class="text-xs ${getAQICategory(no2AQI).color}">AQI: ${no2AQI}</p>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">SO₂</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${so2.toFixed(1)} μg/m³</p>
                        <p class="text-xs ${getAQICategory(so2AQI).color}">AQI: ${so2AQI}</p>
                    </div>
                    <div class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm text-gray-600 dark:text-gray-300">CO</p>
                        <p class="font-semibold text-gray-800 dark:text-white">${co.toFixed(2)} ppm</p>
                        <p class="text-xs ${getAQICategory(coAQI).color}">AQI: ${coAQI}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error updating AQI display:', error);
        aqiDisplay.innerHTML = `
            <div class="text-center p-4">
                <p class="text-red-500 dark:text-red-400">Unable to display AQI data. Please try again.</p>
            </div>
        `;
    }
}

function updateAlerts(data) {
    if (!data.alerts || data.alerts.length === 0) {
        return;
    }

    const alertsHtml = data.alerts.map(alert => `
        <div class="bg-red-500/10 rounded-xl p-4 mb-4">
            <div class="flex items-center space-x-2 text-red-500 mb-2">
                <i class="fas fa-exclamation-triangle"></i>
                <h3 class="font-semibold">${alert.event}</h3>
            </div>
            <p class="mb-2">${alert.description}</p>
            <div class="text-sm text-gray-400">
                <div>From: ${new Date(alert.start * 1000).toLocaleString()}</div>
                <div>To: ${new Date(alert.end * 1000).toLocaleString()}</div>
            </div>
        </div>
    `).join('');

    currentWeather.insertAdjacentHTML('beforeend', `
        <div class="mt-4">
            <h3 class="text-xl font-semibold mb-2">Weather Alerts</h3>
            ${alertsHtml}
        </div>
    `);
}

// Update weather conditions display
function updateWeatherConditions(data) {
    if (!conditionsVisualization) {
        console.error('Weather conditions element not found');
        return;
    }

    try {
        if (!data || !data.current) {
            throw new Error('No weather data available');
        }

        const current = data.current;
        const weather = current.weather[0];
        
        // Get weather icon based on condition
        const weatherIcon = getWeatherIcon(weather.id);
        
        conditionsVisualization.innerHTML = `
            <div class="flex flex-col items-center justify-center p-2">
                <div class="text-4xl mb-2">${weatherIcon}</div>
                <div class="text-lg font-semibold text-gray-800 dark:text-white mb-1 text-center">
                    ${weather.main}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">
                    ${weather.description}
                </div>
                <div class="grid grid-cols-2 gap-2 w-full">
                    <div class="text-center p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
                        <i class="fas fa-wind text-blue-500 dark:text-blue-400 text-lg mb-1"></i>
                        <p class="text-xs text-gray-600 dark:text-gray-300">Wind</p>
                        <p class="font-semibold text-sm text-gray-800 dark:text-white">${current.wind_speed} m/s</p>
                    </div>
                    <div class="text-center p-2 bg-blue-50 dark:bg-gray-700 rounded-lg">
                        <i class="fas fa-tint text-blue-500 dark:text-blue-400 text-lg mb-1"></i>
                        <p class="text-xs text-gray-600 dark:text-gray-300">Humidity</p>
                        <p class="font-semibold text-sm text-gray-800 dark:text-white">${current.humidity}%</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error updating weather conditions:', error);
        conditionsVisualization.innerHTML = `
            <div class="text-center p-2">
                <p class="text-red-500 dark:text-red-400 text-sm">Unable to display weather conditions. Please try again.</p>
            </div>
        `;
    }
}

// Helper function to get weather icon
function getWeatherIcon(code) {
    const icons = {
        // Clear sky
        800: '☀️',
        // Clouds
        801: '🌤️',
        802: '⛅',
        803: '☁️',
        804: '☁️',
        // Rain
        500: '🌧️',
        501: '🌧️',
        502: '🌧️',
        503: '🌧️',
        504: '🌧️',
        // Drizzle
        300: '🌦️',
        301: '🌦️',
        302: '🌦️',
        310: '🌦️',
        311: '🌦️',
        312: '🌦️',
        313: '🌦️',
        314: '🌦️',
        321: '🌦️',
        // Thunderstorm
        200: '⛈️',
        201: '⛈️',
        202: '⛈️',
        210: '⛈️',
        211: '⛈️',
        212: '⛈️',
        221: '⛈️',
        230: '⛈️',
        231: '⛈️',
        232: '⛈️',
        // Snow
        600: '🌨️',
        601: '🌨️',
        602: '🌨️',
        611: '🌨️',
        612: '🌨️',
        613: '🌨️',
        615: '🌨️',
        616: '🌨️',
        620: '🌨️',
        621: '🌨️',
        622: '🌨️',
        // Atmosphere
        701: '🌫️',
        711: '🌫️',
        721: '🌫️',
        731: '🌫️',
        741: '🌫️',
        751: '🌫️',
        761: '🌫️',
        762: '🌫️',
        771: '🌫️',
        781: '🌫️'
    };
    
    return icons[code] || '❓';
}

function playSpotifyForWeather(condition) {
    const playlist = SPOTIFY_PLAYLISTS[condition] || SPOTIFY_PLAYLISTS['Clear'];
    spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${playlist}?utm_source=generator&theme=0`;
    
    // Add custom styling to hide album art and artist images
    const style = document.createElement('style');
    style.textContent = `
        iframe[src*="spotify.com"] {
            border: none;
        }
        iframe[src*="spotify.com"] + div {
            display: none !important;
        }
        iframe[src*="spotify.com"] + div img {
            display: none !important;
        }
        iframe[src*="spotify.com"] + div div[style*="background-image"] {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Add clothing suggestions based on weather
function getClothingSuggestions(weatherData) {
    const temp = weatherData.current.temp;
    const weather = weatherData.current.weather[0].main.toLowerCase();
    const windSpeed = weatherData.current.wind_speed;
    const rain = weatherData.current.rain ? weatherData.current.rain['1h'] : 0;

    let suggestions = {
        top: [],
        bottom: [],
        outerwear: [],
        accessories: []
    };

    // Temperature-based suggestions with emojis
    if (temp < 5) {
        suggestions.top.push('🧥 Thermal base layer', '🧶 Wool sweater');
        suggestions.bottom.push('👖 Thermal leggings', '👖 Warm pants');
        suggestions.outerwear.push('🧥 Heavy winter coat', '🧥 Insulated jacket');
        suggestions.accessories.push('🧤 Winter gloves', '🧢 Warm hat', '🧣 Scarf');
    } else if (temp < 10) {
        suggestions.top.push('👕 Long-sleeve shirt', '🧥 Sweater');
        suggestions.bottom.push('👖 Jeans', '👖 Warm pants');
        suggestions.outerwear.push('🧥 Winter jacket', '🧥 Coat');
        suggestions.accessories.push('🧤 Gloves', '🧢 Hat');
    } else if (temp < 15) {
        suggestions.top.push('👕 Long-sleeve shirt', '🧥 Light sweater');
        suggestions.bottom.push('👖 Jeans', '👖 Pants');
        suggestions.outerwear.push('🧥 Light jacket', '🧥 Sweater');
        suggestions.accessories.push('🧣 Light scarf');
    } else if (temp < 20) {
        suggestions.top.push('👕 Long-sleeve shirt', '👕 T-shirt');
        suggestions.bottom.push('👖 Jeans', '👖 Pants');
        suggestions.outerwear.push('🧥 Light jacket');
    } else if (temp < 25) {
        suggestions.top.push('👕 T-shirt', '👕 Light shirt');
        suggestions.bottom.push('👖 Jeans', '👖 Pants');
    } else {
        suggestions.top.push('👕 Light t-shirt', '👕 Tank top');
        suggestions.bottom.push('🩳 Shorts', '👖 Light pants');
        suggestions.accessories.push('🕶️ Sunglasses');
    }

    // Weather condition adjustments with emojis
    if (weather.includes('rain') || rain > 0) {
        suggestions.outerwear.push('🌂 Rain jacket', '☔ Umbrella');
        suggestions.accessories.push('👢 Waterproof shoes');
    }
    if (weather.includes('snow')) {
        suggestions.outerwear.push('🧥 Waterproof winter coat');
        suggestions.accessories.push('👢 Waterproof boots', '🧤 Snow gloves');
    }
    if (windSpeed > 20) {
        suggestions.outerwear.push('🧥 Windbreaker');
        suggestions.accessories.push('🧥 Wind-resistant jacket');
    }

    return suggestions;
}

function updateClothingSuggestions(weatherData) {
    const clothingSection = document.getElementById('clothingSuggestions');
    if (!clothingSection) return;

    const suggestions = getClothingSuggestions(weatherData);
    const temp = weatherData.current.temp;
    const weather = weatherData.current.weather[0].main.toLowerCase();
    
    // Get weather emoji
    let weatherEmoji = '☀️';
    if (weather.includes('rain')) weatherEmoji = '🌧️';
    else if (weather.includes('snow')) weatherEmoji = '❄️';
    else if (weather.includes('cloud')) weatherEmoji = '☁️';
    else if (weather.includes('thunder')) weatherEmoji = '⛈️';
    else if (weather.includes('mist') || weather.includes('fog')) weatherEmoji = '🌫️';
    
    // Create the HTML content with enhanced styling
    let html = `
        <div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                    <span>👔</span> What to Wear
                </h2>
                <div class="text-3xl">${weatherEmoji}</div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <div class="bg-white/5 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/10">
                        <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span>👕</span> Top
                        </h3>
                        <ul class="space-y-2">
                            ${suggestions.top.map(item => `
                                <li class="text-gray-200 flex items-center gap-2">
                                    <span class="text-yellow-400">•</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="bg-white/5 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/10">
                        <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span>👖</span> Bottom
                        </h3>
                        <ul class="space-y-2">
                            ${suggestions.bottom.map(item => `
                                <li class="text-gray-200 flex items-center gap-2">
                                    <span class="text-yellow-400">•</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="bg-white/5 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/10">
                        <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span>🧥</span> Outerwear
                        </h3>
                        <ul class="space-y-2">
                            ${suggestions.outerwear.map(item => `
                                <li class="text-gray-200 flex items-center gap-2">
                                    <span class="text-yellow-400">•</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="bg-white/5 rounded-lg p-4 transform transition-all duration-300 hover:bg-white/10">
                        <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <span>🧤</span> Accessories
                        </h3>
                        <ul class="space-y-2">
                            ${suggestions.accessories.map(item => `
                                <li class="text-gray-200 flex items-center gap-2">
                                    <span class="text-yellow-400">•</span>
                                    <span>${item}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 text-sm text-gray-400 text-center">
                Based on current temperature: ${temp.toFixed(1)}°C
            </div>
        </div>
    `;

    clothingSection.innerHTML = html;
}

// Update handleSearch to safely use globe
async function handleSearch() {
    const query = citySearch.value.trim();
    if (!query) return;

    try {
        showLoading();
        
        // Check if the query is coordinates
        const coordsMatch = query.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
        if (coordsMatch) {
            const [_, lat, lon] = coordsMatch;
            handleSearchWithCoords(parseFloat(lat), parseFloat(lon));
            return;
        }

        // Parse city and country if present
        const [city, country] = query.split(',').map(s => s.trim());
        const searchQuery = country ? `${city},${country}` : city;

        // Get coordinates for the city
        const geoResponse = await fetch(`${GEO_BASE_URL}/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`);
        if (!geoResponse.ok) {
            const errorData = await geoResponse.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to find city coordinates');
        }
        
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];
        currentCity = city; // Store just the city name without country
        
        // Update globe view if globe is initialized
        if (window.globe) {
            window.globe.pointOfView({ lat, lng: lon, altitude: 2 }, 1000);
        }
        
        // Fetch weather and AQI data in parallel
        const [weatherData, aqiData] = await Promise.all([
            fetchWeatherData(lat, lon),
            fetchAQIData(lat, lon)
        ]).catch(error => {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        });

        currentWeather.classList.remove('hidden');
        updateCurrentWeather(weatherData);
        updateWeatherConditions(weatherData);
        updateHourlyForecast(weatherData);
        updateDailyForecast(weatherData);
        updateAQIDisplay(aqiData);
        updateAlerts(weatherData);
        updateClothingSuggestions(weatherData);
        playSpotifyForWeather(weatherData.current.weather[0].main);

        // Clear suggestions after successful search
        citySuggestions.innerHTML = '';
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Failed to fetch weather data. Please try again.');
        currentWeather.classList.add('hidden');
    } finally {
        hideLoading();
    }
}

// Update handleSearchWithCoords to ensure no arcs are added
async function handleSearchWithCoords(lat, lon) {
    try {
        showLoading();
        
        // Fetch city name from coordinates
        const geoResponse = await fetch(`${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
        if (!geoResponse.ok) throw new Error('Failed to fetch location data');
        
        const locationData = await geoResponse.json();
        if (locationData && locationData.length > 0) {
            currentCity = locationData[0].name;
            citySearch.value = currentCity;
        } else {
            currentCity = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
        }
        
        // Update globe view and add point for selected city
        if (window.globe) {
            window.globe.pointOfView({ lat, lng: lon, altitude: 2 }, 1000);
            // Add a point for the selected city
            window.globe.pointsData([{
                name: currentCity,
                lat: lat,
                lng: lon
            }]);
            // Ensure no arcs or lines are present
            if (window.globe.arcsData) {
                window.globe.arcsData([]);
            }
            if (window.globe.pathsData) {
                window.globe.pathsData([]);
            }
            if (window.globe.linesData) {
                window.globe.linesData([]);
            }
        }
        
        // Fetch weather and AQI data in parallel
        const [weatherData, aqiData] = await Promise.all([
            fetchWeatherData(lat, lon),
            fetchAQIData(lat, lon)
        ]).catch(error => {
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        });

        currentWeather.classList.remove('hidden');
        updateCurrentWeather(weatherData);
        updateWeatherConditions(weatherData);
        updateHourlyForecast(weatherData);
        updateDailyForecast(weatherData);
        updateAQIDisplay(aqiData);
        updateAlerts(weatherData);
        updateClothingSuggestions(weatherData);
        playSpotifyForWeather(weatherData.current.weather[0].main);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Failed to fetch weather data. Please try again.');
        currentWeather.classList.add('hidden');
    } finally {
        hideLoading();
    }
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
citySearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
});
themeToggle.addEventListener('click', toggleDarkMode);

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!citySearch.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.classList.add('hidden');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    globe.width(window.innerWidth);
});

// Initialize
initDarkMode();

// Get user location with improved error handling
async function getUserLocation() {
    showLoading();
    try {
        // Try IP-based location first as it's more reliable
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const ipData = await response.json();
                if (ipData.latitude && ipData.longitude) {
                    citySearch.value = ipData.city;
                    await handleSearchWithCoords(ipData.latitude, ipData.longitude);
                    return;
                }
            }
        } catch (ipError) {
            console.error('IP location error:', ipError);
        }

        // If IP location fails, try browser geolocation
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false, // Use lower accuracy for faster response
                timeout: 5000, // Shorter timeout
                maximumAge: 60000 // Accept location up to 1 minute old
            });
        });

        const { latitude, longitude } = position.coords;
        
        // Fetch city name from coordinates
        const response = await fetch(`${GEO_BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch location data');
        
        const locationData = await response.json();
        if (locationData && locationData.length > 0) {
            const cityName = locationData[0].name;
            citySearch.value = cityName;
            await handleSearchWithCoords(latitude, longitude);
        } else {
            throw new Error('No location data found');
        }
    } catch (error) {
        console.error('Error getting location:', error);
        
        // Final fallback to Delhi
        const delhiCoords = { lat: 28.6139, lon: 77.2090 };
        citySearch.value = 'Delhi';
        await handleSearchWithCoords(delhiCoords.lat, delhiCoords.lon);
    } finally {
        hideLoading();
    }
}

// Initialize the application
function initApp() {
    // Check for required elements
    if (!checkRequiredElements()) {
        console.error('Required elements not found');
        return;
    }

    // Initialize globe and dark mode
    initGlobe();
    initDarkMode();

    // Add event listeners
    searchBtn.addEventListener('click', handleSearch);
    citySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    themeToggle.addEventListener('click', toggleDarkMode);
    unitToggle.addEventListener('click', () => {
        isCelsius = !isCelsius;
        // Update the button text
        unitToggle.textContent = isCelsius ? '°C' : '°F';
        // Refresh the current weather display if we have data
        if (currentCity) {
            handleSearch();
        }
    });

    // Initialize the unit toggle button text
    unitToggle.textContent = isCelsius ? '°C' : '°F';

    // Try to get user's location
    getUserLocation().catch(error => {
        console.error('Error getting user location:', error);
    });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp); 