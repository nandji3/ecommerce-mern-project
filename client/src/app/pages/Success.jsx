import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-700">🎉 Payment Successful!</h1>
            <p className="mt-4 text-gray-700">Thank you for your purchase.</p>
            <Link
                to="/products"
                className="mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            >
                Back to Products
            </Link>
        </div>
    );
};

export default Success;
