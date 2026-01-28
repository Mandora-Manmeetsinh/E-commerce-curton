import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text, color = '#f8e825' }) => {
    return (
        <div className="flex items-center mb-2">
            <span className="mr-1">
                {value >= 1 ? (
                    <FaStar style={{ color }} />
                ) : value >= 0.5 ? (
                    <FaStarHalfAlt style={{ color }} />
                ) : (
                    <FaRegStar style={{ color }} />
                )}
            </span>
            <span className="mr-1">
                {value >= 2 ? (
                    <FaStar style={{ color }} />
                ) : value >= 1.5 ? (
                    <FaStarHalfAlt style={{ color }} />
                ) : (
                    <FaRegStar style={{ color }} />
                )}
            </span>
            <span className="mr-1">
                {value >= 3 ? (
                    <FaStar style={{ color }} />
                ) : value >= 2.5 ? (
                    <FaStarHalfAlt style={{ color }} />
                ) : (
                    <FaRegStar style={{ color }} />
                )}
            </span>
            <span className="mr-1">
                {value >= 4 ? (
                    <FaStar style={{ color }} />
                ) : value >= 3.5 ? (
                    <FaStarHalfAlt style={{ color }} />
                ) : (
                    <FaRegStar style={{ color }} />
                )}
            </span>
            <span className="mr-1">
                {value >= 5 ? (
                    <FaStar style={{ color }} />
                ) : value >= 4.5 ? (
                    <FaStarHalfAlt style={{ color }} />
                ) : (
                    <FaRegStar style={{ color }} />
                )}
            </span>
            <span className="text-sm text-gray-600 ml-2">{text && text}</span>
        </div>
    );
};

export default Rating;
