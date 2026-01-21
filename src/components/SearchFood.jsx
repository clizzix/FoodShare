import React, { useState } from 'react';
import { searchFood, getFoodDetails } from '../services/fatSecretApi';
import FoodCard from './FoodCard';

const SearchFood = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        try {
            const foods = await searchFood(query);
            console.log('Processed food list:', foods);
            const foodList = Array.isArray(foods)
                ? foods
                : foods
                  ? [foods]
                  : [];
            setResults(foodList);
            setSelectedFood(null);
        } catch (error) {
            console.error('Error searching food:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectFood = async (foodId) => {
        setLoading(true);
        try {
            const food = await getFoodDetails(foodId);
            console.log('Selected food details:', food);
            setSelectedFood(food);
        } catch (error) {
            console.error('Error getting food details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Food Database</h1>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for ingredients(i.e. Banana or Noodles)..."
                    className="flex-1 border p-3 rounded shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-hover disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Loading' : 'Search'}
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {results.length > 0 && (
                        <h2 className="text-xl font-semibold">
                            Suchergebnisse
                        </h2>
                    )}
                    {results.map((food) => (
                        <FoodCard
                            key={food.food_id}
                            food={food}
                            onClick={() => handleSelectFood(food.food_id)}
                        />
                    ))}
                </div>

                {selectedFood && (
                    <div className="border p-6 rounded-lg shadow-lg bg-white h-fit sticky top-6">
                        <h2 className="text-2xl font-bold mb-2 text-primary">
                            {selectedFood.food_name}
                        </h2>
                        <div className="text-gray-700 mb-4">
                            <span className="font-semibold">Marke:</span>{' '}
                            {selectedFood.brand_name || 'Allgemein'}
                        </div>

                        <h3 className="font-semibold text-lg mb-2 border-b pb-1">
                            Portionen
                        </h3>
                        <div className="space-y-3">
                            {selectedFood.servings &&
                                selectedFood.servings.serving &&
                                []
                                    .concat(selectedFood.servings.serving)
                                    .map((s, idx) => (
                                        <div
                                            key={idx}
                                            className="text-sm bg-gray-50 p-3 rounded"
                                        >
                                            <p className="font-bold text-gray-900">
                                                {s.serving_description}
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 mt-1 text-gray-600">
                                                <p>
                                                    Kalorien:{' '}
                                                    <span className="text-black">
                                                        {s.calories}
                                                    </span>
                                                </p>
                                                <p>
                                                    Eiweiß:{' '}
                                                    <span className="text-black">
                                                        {s.protein}g
                                                    </span>
                                                </p>
                                                <p>
                                                    Kohlenhydrate:{' '}
                                                    <span className="text-black">
                                                        {s.carbohydrate}g
                                                    </span>
                                                </p>
                                                <p>
                                                    Fett:{' '}
                                                    <span className="text-black">
                                                        {s.fat}g
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFood;
