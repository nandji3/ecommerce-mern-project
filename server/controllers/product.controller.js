const Product = require("../models/product.model");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

module.exports = {
    getProducts,
};
