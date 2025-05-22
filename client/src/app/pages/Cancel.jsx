import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
            <h1 className="text-3xl font-bold text-red-600">❌ Payment Cancelled</h1>
            <p className="mt-4 text-gray-700">Your payment was not completed.</p>
            <Link
                to="/products"
                className="mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
                Try Again
            </Link>
        </div>
    );
};

export default Cancel;
