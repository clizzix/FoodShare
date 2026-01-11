const CLIENT_ID = import.meta.env.VITE_FATSECRET_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_FATSECRET_CLIENT_SECRET;
const TOKEN_URL = '/api/auth/connect/token';
const API_URL = '/api/platform/rest/server.api';

let accessToken = null;
let tokenExpiration = 0;

// Retrieve the Access Token through the API Credentials
const getAccessToken = async () => {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.error(
            'Missing API Credentials! Make sure VITE_FATSECRET_CLIENT_ID and VITE_FATSECRET_CLIENT_SECRET are in your .env file.'
        );
        throw new Error('Missing API Credentials');
    }

    if (accessToken && Date.now() < tokenExpiration) {
        return accessToken;
    }

    console.log('Fetching new access token...');
    try {
        const response = await fetch(TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
            },
            body: 'grant_type=client_credentials&scope=basic',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Token fetch failed:', response.status, errorText);
            throw new Error('Failed to obtain access token');
        }

        const data = await response.json();
        accessToken = data.access_token;
        tokenExpiration = Date.now() + data.expires_in * 1000;
        console.log('Access token received.');
        return accessToken;
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        throw error;
    }
};

// Search Query Logic for the Search Page

export const searchFood = async (query) => {
    console.log(`Searching for food: "${query}"`);
    const token = await getAccessToken();
    const params = new URLSearchParams({
        method: 'foods.search',
        search_expression: query,
        format: 'json',
        region: 'DE',
        language: 'de',
    });

    const response = await fetch(`${API_URL}?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message || 'FatSecret API Error');
    }

    console.log('Search results raw data:', data);
    return data.foods ? data.foods.food : [];
};

// Get the Detail View for the SearchPage

export const getFoodDetails = async (foodId) => {
    console.log(`Fetching details for food ID: ${foodId}`);
    const token = await getAccessToken();
    const params = new URLSearchParams({
        method: 'food.get.v2',
        food_id: foodId,
        format: 'json',
        region: 'DE',
        language: 'de',
    });

    const response = await fetch(`${API_URL}?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message || 'FatSecret API Error');
    }

    console.log('Food details raw data:', data);
    return data.food;
};
