import React from "react";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ rating, maxStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const partialStarPercentage = (rating % 1) * 100;
    const emptyStars = maxStars - Math.ceil(rating);

    return (
        <div className="flex items-center text-sm">
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={index} className="text-yellow-500" />
            ))}
            {partialStarPercentage > 0 && (
                <div className="relative">
                    <FaStar className="text-gray-300" />
                    <FaStar
                        className="text-yellow-500 absolute left-0 top-0"
                        style={{
                            clipPath: `inset(0 ${100 - partialStarPercentage}% 0 0)`,
                        }}
                    />
                </div>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <FaStar key={index} className="text-gray-300" />
            ))}
        </div>
    );
};

export default RatingStar;
