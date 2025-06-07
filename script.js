// API Configuration
const OPENWEATHER_API_KEY = '683e288d8c48eaecd136e2ca4eeb0992'; // Replace with your OpenWeather API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

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
const citySearch = document.getElementById('citySearch');
const searchBtn = document.getElementById('searchBtn');
const themeToggle = document.getElementById('themeToggle');
const currentWeather = document.getElementById('currentWeather');
const forecast = document.getElementById('forecast');
const spotifyPlayer = document.getElementById('spotifyPlayer');
const favoritesList = document.getElementById('favoritesList');

// Create suggestions container
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'absolute w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-1 z-50 hidden';
citySearch.parentElement.appendChild(suggestionsContainer);

// Filter and display city suggestions
function showCitySuggestions(input) {
    const value = input.toLowerCase();
    if (!value) {
        suggestionsContainer.classList.add('hidden');
        return;
    }

    const filteredInternational = CITY_SUGGESTIONS.international.filter(city => 
        city.toLowerCase().includes(value)
    );
    const filteredIndian = CITY_SUGGESTIONS.indian.filter(city => 
        city.toLowerCase().includes(value)
    );

    if (filteredInternational.length === 0 && filteredIndian.length === 0) {
        suggestionsContainer.classList.add('hidden');
        return;
    }

    let html = '';
    
    if (filteredInternational.length > 0) {
        html += '<div class="p-2"><p class="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">International Cities</p>';
        filteredInternational.forEach(city => {
            html += `<div class="suggestion-item px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-white">${city}</div>`;
        });
        html += '</div>';
    }

    if (filteredIndian.length > 0) {
        html += '<div class="p-2 border-t border-gray-200 dark:border-gray-700"><p class="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">Indian Cities</p>';
        filteredIndian.forEach(city => {
            html += `<div class="suggestion-item px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-white">${city}</div>`;
        });
        html += '</div>';
    }

    suggestionsContainer.innerHTML = html;
    suggestionsContainer.classList.remove('hidden');

    // Add click event listeners to suggestions
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            citySearch.value = item.textContent;
            suggestionsContainer.classList.add('hidden');
            handleSearch();
        });
    });
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
}

// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

// Fetch 5-day forecast
async function fetchForecast(city) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        return null;
    }
}

// Update current weather display
function updateCurrentWeather(data) {
    if (!data) return;

    const weather = data.weather[0];
    const main = data.main;
    const wind = data.wind;

    currentWeather.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold text-gray-800 dark:text-white">${data.name}</h2>
                <p class="text-6xl font-bold text-gray-800 dark:text-white my-4">${Math.round(main.temp)}°C</p>
                <p class="text-xl text-gray-600 dark:text-gray-300">${weather.description}</p>
            </div>
            <div class="text-right">
                <img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}" class="weather-icon floating">
                <p class="text-gray-600 dark:text-gray-300">Feels like: ${Math.round(main.feels_like)}°C</p>
                <p class="text-gray-600 dark:text-gray-300">Humidity: ${main.humidity}%</p>
                <p class="text-gray-600 dark:text-gray-300">Wind: ${wind.speed} m/s</p>
            </div>
        </div>
    `;
    currentWeather.classList.remove('hidden');

    // Update visualizations
    updateTemperatureVisualization(main.temp);
    updateConditionsVisualization(weather.main, weather.description);
    
    // Update Spotify playlist based on weather
    updateSpotifyPlaylist(weather.main);
}

// Update temperature visualization
function updateTemperatureVisualization(temp) {
    const tempVisualization = document.getElementById('tempVisualization');
    const roundedTemp = Math.round(temp);
    
    // Create temperature gauge visualization
    let html = `
        <div class="relative w-48 h-48">
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-6xl font-bold text-gray-800 dark:text-white">${roundedTemp}°</div>
            </div>
            <div class="absolute inset-0">
                <svg viewBox="0 0 100 100" class="transform -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                    <circle cx="50" cy="50" r="45" fill="none" 
                        stroke="${getTemperatureColor(roundedTemp)}" 
                        stroke-width="8"
                        stroke-dasharray="${getTemperatureDashArray(roundedTemp)}"
                        class="transition-all duration-1000 ease-out"/>
                </svg>
            </div>
        </div>
    `;
    
    tempVisualization.innerHTML = html;
}

// Update weather conditions visualization
function updateConditionsVisualization(condition, description) {
    const conditionsVisualization = document.getElementById('conditionsVisualization');
    
    const weatherIcons = {
        'Clear': 'sun',
        'Clouds': 'cloud',
        'Rain': 'cloud-rain',
        'Drizzle': 'cloud-rain',
        'Thunderstorm': 'bolt',
        'Snow': 'snowflake',
        'Mist': 'smog',
        'Smoke': 'smog',
        'Haze': 'smog',
        'Dust': 'wind',
        'Fog': 'smog',
        'Sand': 'wind',
        'Ash': 'wind',
        'Squall': 'wind',
        'Tornado': 'wind'
    };

    const icon = weatherIcons[condition] || 'cloud';
    const color = getWeatherColor(condition);

    let html = `
        <div class="flex flex-col items-center">
            <i class="fas fa-${icon} text-8xl ${color} weather-icon floating mb-4"></i>
            <p class="text-xl text-gray-800 dark:text-white capitalize">${description}</p>
        </div>
    `;
    
    conditionsVisualization.innerHTML = html;
}

// Helper function to get temperature color
function getTemperatureColor(temp) {
    if (temp <= 0) return '#60A5FA'; // Cold - Blue
    if (temp <= 15) return '#34D399'; // Cool - Green
    if (temp <= 25) return '#FBBF24'; // Warm - Yellow
    if (temp <= 35) return '#F87171'; // Hot - Red
    return '#DC2626'; // Very Hot - Dark Red
}

// Helper function to get temperature dash array
function getTemperatureDashArray(temp) {
    const percentage = Math.min(Math.max((temp + 20) / 60 * 283, 0), 283);
    return `${percentage} 283`;
}

// Helper function to get weather color
function getWeatherColor(condition) {
    const colors = {
        'Clear': 'text-yellow-400',
        'Clouds': 'text-gray-400',
        'Rain': 'text-blue-400',
        'Drizzle': 'text-blue-300',
        'Thunderstorm': 'text-purple-500',
        'Snow': 'text-blue-200',
        'Mist': 'text-gray-300',
        'Smoke': 'text-gray-500',
        'Haze': 'text-gray-400',
        'Dust': 'text-yellow-600',
        'Fog': 'text-gray-300',
        'Sand': 'text-yellow-500',
        'Ash': 'text-gray-600',
        'Squall': 'text-blue-500',
        'Tornado': 'text-gray-700'
    };
    return colors[condition] || 'text-gray-400';
}

// Update 5-day forecast
function updateForecast(data) {
    if (!data) return;

    const forecastContainer = forecast.querySelector('.flex');
    forecastContainer.innerHTML = '';

    // Group forecast by day
    const dailyForecasts = data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = item;
        }
        return acc;
    }, {});

    // Create forecast cards
    Object.values(dailyForecasts).slice(0, 5).forEach(day => {
        const date = new Date(day.dt * 1000);
        const card = document.createElement('div');
        card.className = 'flex-shrink-0 w-48 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg';
        card.innerHTML = `
            <p class="text-lg font-semibold text-gray-800 dark:text-white">${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
            <p class="text-2xl font-bold text-gray-800 dark:text-white">${Math.round(day.main.temp)}°C</p>
            <p class="text-gray-600 dark:text-gray-300">${day.weather[0].description}</p>
        `;
        forecastContainer.appendChild(card);
    });
}

// Update Spotify playlist
function updateSpotifyPlaylist(weatherCondition) {
    const playlistId = SPOTIFY_PLAYLISTS[weatherCondition] || SPOTIFY_PLAYLISTS['Clear'];
    spotifyPlayer.innerHTML = `
        <iframe src="https://open.spotify.com/embed/playlist/${playlistId}?autoplay=1"
                width="100%"
                height="352"
                frameborder="0"
                allowtransparency="true"
                allow="encrypted-media; autoplay"
                loading="lazy">
        </iframe>
    `;
}

// Initialize charts
function initCharts(forecastData) {
    if (!forecastData) return;

    const labels = forecastData.list.map(item => 
        new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })
    );
    const temperatures = forecastData.list.map(item => item.main.temp);
    const windSpeeds = forecastData.list.map(item => item.wind.speed);

    // Temperature Chart
    new Chart(document.getElementById('temperatureChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Trend'
                }
            }
        }
    });

    // Wind Chart
    new Chart(document.getElementById('windChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wind Speed (m/s)',
                data: windSpeeds,
                borderColor: 'rgb(16, 185, 129)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Wind Speed Trend'
                }
            }
        }
    });
}

// Handle search
async function handleSearch() {
    const city = citySearch.value.trim();
    if (!city) return;

    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);

    updateCurrentWeather(weatherData);
    updateForecast(forecastData);
    initCharts(forecastData);
}

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
citySearch.addEventListener('input', (e) => {
    showCitySuggestions(e.target.value);
});
themeToggle.addEventListener('click', toggleDarkMode);

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!citySearch.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.classList.add('hidden');
    }
});

// Initialize
initDarkMode();

// Get user's location and fetch weather
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const response = await fetch(
                `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
            );
            const data = await response.json();
            citySearch.value = data.name;
            handleSearch();
        } catch (error) {
            console.error('Error fetching location weather:', error);
        }
    });
} 