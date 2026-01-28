import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyle = "px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-light focus:ring-primary",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary",
        outline: "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
