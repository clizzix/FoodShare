import React from 'react';

const FoodCard = ({ food, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer transition bg-white"
        >
            <h3 className="font-bold text-lg">{food.food_name}</h3>
            <p className="text-gray-600 text-sm">{food.food_description}</p>
        </div>
    );
};

export default FoodCard;
