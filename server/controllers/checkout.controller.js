const Stripe = require("stripe");
const Product = require("../models/product.model");
const Purchase = require("../models/purchase.model");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: { name: product.name },
                    unit_amount: product.price,
                },
                quantity: 1,
            }],
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        await Purchase.create({
            userId,
            productId,
            stripeSessionId: session.id,
        });

        res.json({ url: session.url });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Stripe session error" });
    }
};

module.exports = {
    createCheckoutSession,
};
