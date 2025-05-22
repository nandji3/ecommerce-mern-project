import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../api/axiosInstance';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axiosInstance
            .get('/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleBuyNow = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axiosInstance.post(
                '/create-checkout-session',
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error('Stripe Checkout Error:', err);
            alert('Failed to initiate checkout.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} onBuyNow={handleBuyNow} />
                ))}
            </div>
        </div>
    );
};

export default Products;
