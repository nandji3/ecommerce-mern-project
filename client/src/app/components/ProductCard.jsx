export default function ProductCard({ product, handleBuyNow }) {
    return (
        <div className="border rounded p-4 shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-gray-700">${product.price / 100}</p>
            <button
                onClick={() => handleBuyNow(product._id)}
                className="bg-teal-600 text-white px-4 py-2 mt-2 rounded hover:bg-teal-700"
            >
                Buy Now
            </button>
        </div>
    );
}